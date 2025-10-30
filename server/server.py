# server.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn
from datetime import datetime
import json
import asyncio

app = FastAPI(title="Turtle AI Healthcare Assistant", version="2.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatRequest(BaseModel):
    message: str
    user_id: str
    session_id: Optional[str] = None
    context: Optional[Dict] = {}
    stream: Optional[bool] = False
    model: Optional[str] = "turtle-healthcare-v1"

class ChatResponse(BaseModel):
    success: bool
    response: str
    quick_replies: Optional[List[str]] = []
    intent: str
    confidence: float
    metadata: Optional[Dict] = {}
    timestamp: str

# In-memory storage
chat_sessions = {}
active_connections: Dict[str, WebSocket] = {}

# Turtle AI Core Engine
class TurtleAIEngine:
    def __init__(self):
        self.model_name = "turtle-healthcare-v1"
        self.intents = self._load_intents()
    
    def _load_intents(self):
        return {
            'greeting': {
                'patterns': ['hi', 'hello', 'hey', 'greetings'],
                'responses': [
                    "👋 Hello! I'm Turtle AI, your intelligent healthcare assistant. How can I help you today?",
                    "Hi there! Welcome to your health companion. What brings you here today?"
                ],
                'quick_replies': ['Find Doctors', 'Book Lab Tests', 'Order Medicines', 'Health Tips']
            },
            'doctor': {
                'patterns': ['doctor', 'physician', 'specialist', 'appointment'],
                'responses': [
                    "🩺 I can help you find the perfect doctor for your needs. We have specialists across various fields.",
                    "Let me assist you in finding the right doctor. What specialty are you looking for?"
                ],
                'quick_replies': ['Search by Specialty', 'View Top Doctors', 'Book Appointment', 'Emergency']
            },
            'medicine': {
                'patterns': ['medicine', 'medication', 'drug', 'tablet', 'prescription'],
                'responses': [
                    "💊 I can help you with medicines! What would you like to know?",
                    "Let me assist you with medication information. How can I help?"
                ],
                'quick_replies': ['Search Medicine', 'Upload Prescription', 'Check Interactions', 'Order Refill']
            },
            'lab_test': {
                'patterns': ['lab', 'test', 'blood test', 'checkup', 'diagnostic'],
                'responses': [
                    "🔬 We offer comprehensive lab testing with home collection. What test are you interested in?",
                    "I can help you book lab tests. What would you like to get tested?"
                ],
                'quick_replies': ['Full Body Checkup', 'Blood Tests', 'Home Collection', 'View Reports']
            },
            'emergency': {
                'patterns': ['emergency', 'urgent', 'critical', 'severe pain', 'chest pain'],
                'responses': [
                    "🚨 **EMERGENCY ALERT**\n\nIf this is a medical emergency:\n\n1. Call 108/112 immediately\n2. Visit nearest ER\n3. Contact your doctor\n\nFor urgent non-emergency care:"
                ],
                'quick_replies': ['Find ER Near Me', 'Call Ambulance', 'Urgent Care', 'Telemedicine Now']
            }
        }
    
    def detect_intent(self, message: str) -> tuple:
        """Detect intent with confidence score"""
        message_lower = message.lower()
        
        for intent_name, intent_data in self.intents.items():
            for pattern in intent_data['patterns']:
                if pattern in message_lower:
                    confidence = 0.85 + (len(pattern) / len(message_lower)) * 0.15
                    return intent_name, min(confidence, 1.0)
        
        return 'general', 0.5
    
    def generate_response(self, message: str, intent: str, context: dict = {}) -> dict:
        """Generate AI response"""
        import random
        
        intent_data = self.intents.get(intent, {
            'responses': ["I'm here to help with your healthcare needs. How can I assist you?"],
            'quick_replies': ['Find Doctors', 'Lab Tests', 'Medicines', 'Health Records']
        })
        
        response_text = random.choice(intent_data['responses'])
        
        return {
            'response': response_text,
            'quick_replies': intent_data.get('quick_replies', []),
            'metadata': {
                'context_used': context,
                'model': self.model_name
            }
        }
    
    async def stream_response(self, message: str, intent: str) -> str:
        """Generate streaming response"""
        response_data = self.generate_response(message, intent)
        response_text = response_data['response']
        
        # Simulate streaming by yielding chunks
        words = response_text.split()
        for i, word in enumerate(words):
            yield word + (' ' if i < len(words) - 1 else '')
            await asyncio.sleep(0.05)  # Simulate typing delay

# Initialize AI Engine
ai_engine = TurtleAIEngine()

@app.get("/")
async def root():
    return {
        "service": "Turtle AI Healthcare Assistant",
        "version": "2.0.0",
        "status": "active",
        "model": "turtle-healthcare-v1"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": True
    }

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint"""
    try:
        # Detect intent
        intent, confidence = ai_engine.detect_intent(request.message)
        
        # Generate response
        response_data = ai_engine.generate_response(
            request.message,
            intent,
            request.context
        )
        
        # Store in session
        if request.session_id:
            if request.session_id not in chat_sessions:
                chat_sessions[request.session_id] = []
            
            chat_sessions[request.session_id].append({
                'user_message': request.message,
                'bot_response': response_data['response'],
                'intent': intent,
                'confidence': confidence,
                'timestamp': datetime.now().isoformat()
            })
        
        return ChatResponse(
            success=True,
            response=response_data['response'],
            quick_replies=response_data['quick_replies'],
            intent=intent,
            confidence=confidence,
            metadata=response_data['metadata'],
            timestamp=datetime.now().isoformat()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    """WebSocket endpoint for streaming responses"""
    await websocket.accept()
    client_id = f"client_{datetime.now().timestamp()}"
    active_connections[client_id] = websocket
    
    try:
        while True:
            data = await websocket.receive_text()
            request_data = json.loads(data)
            
            message = request_data.get('message', '')
            intent, confidence = ai_engine.detect_intent(message)
            
            # Stream response
            async for chunk in ai_engine.stream_response(message, intent):
                await websocket.send_json({
                    'type': 'chunk',
                    'content': chunk
                })
            
            # Send completion
            response_data = ai_engine.generate_response(message, intent)
            await websocket.send_json({
                'type': 'complete',
                'response': response_data['response'],
                'quick_replies': response_data['quick_replies'],
                'intent': intent,
                'confidence': confidence
            })
    
    except WebSocketDisconnect:
        del active_connections[client_id]

@app.get("/api/v1/chat/history/{session_id}")
async def get_history(session_id: str):
    """Get chat history"""
    if session_id in chat_sessions:
        return {
            "success": True,
            "session_id": session_id,
            "messages": chat_sessions[session_id]
        }
    return {"success": False, "message": "Session not found"}

@app.delete("/api/v1/chat/history/{session_id}")
async def clear_history(session_id: str):
    """Clear chat history"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
        return {"success": True, "message": "History cleared"}
    return {"success": False, "message": "Session not found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
