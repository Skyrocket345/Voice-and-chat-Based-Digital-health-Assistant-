



class TurtleAI {
    constructor(config = {}) {
        this.baseURL = config.baseURL || 'http://localhost:8000';
        this.apiKey = config.apiKey || null;
        this.sessionId = this.generateSessionId();
        this.wsConnection = null;
        this.messageQueue = [];
        this.isConnected = false;
    }

    /**
     * Generate unique session ID for conversation tracking
     */
    generateSessionId() {
        return `turtle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Initialize WebSocket connection for real-time streaming
     */
    initWebSocket() {
        const wsURL = this.baseURL.replace('http', 'ws') + '/ws/chat';
        
        this.wsConnection = new WebSocket(wsURL);

        this.wsConnection.onopen = () => {
            console.log('🐢 Turtle AI WebSocket connected');
            this.isConnected = true;
            this.flushMessageQueue();
        };

        this.wsConnection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleStreamingResponse(data);
        };

        this.wsConnection.onerror = (error) => {
            console.error('🐢 Turtle AI WebSocket error:', error);
            this.isConnected = false;
        };

        this.wsConnection.onclose = () => {
            console.log('🐢 Turtle AI WebSocket disconnected');
            this.isConnected = false;
            // Attempt reconnection after 3 seconds
            setTimeout(() => this.initWebSocket(), 3000);
        };
    }

    /**
     * Send message to Turtle AI backend
     */
    async sendMessage(message, userId = 'anonymous', options = {}) {
        const requestBody = {
            message: message,
            user_id: userId,
            session_id: this.sessionId,
            context: options.context || {},
            stream: options.stream || false,
            model: options.model || 'turtle-healthcare-v1'
        };

        try {
            const response = await fetch(`${this.baseURL}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Turtle AI Error: ${response.statusText}`);
            }

            const data = await response.json();
            return this.formatResponse(data);
        } catch (error) {
            console.error('🐢 Turtle AI request failed:', error);
            return this.getOfflineResponse(message);
        }
    }

    /**
     * Stream message responses (for typing effect)
     */
    async streamMessage(message, userId, onChunk, onComplete) {
        if (!this.isConnected) {
            this.initWebSocket();
        }

        const streamRequest = {
            type: 'chat',
            message: message,
            user_id: userId,
            session_id: this.sessionId
        };

        if (this.isConnected) {
            this.wsConnection.send(JSON.stringify(streamRequest));
        } else {
            this.messageQueue.push({ message, userId, onChunk, onComplete });
        }
    }

    /**
     * Handle streaming response chunks
     */
    handleStreamingResponse(data) {
        if (data.type === 'chunk') {
            // Emit chunk to UI
            window.dispatchEvent(new CustomEvent('turtleai-chunk', { 
                detail: { text: data.content, isComplete: false }
            }));
        } else if (data.type === 'complete') {
            window.dispatchEvent(new CustomEvent('turtleai-chunk', { 
                detail: { text: '', isComplete: true, fullResponse: data.response }
            }));
        }
    }

    /**
     * Flush queued messages when connection is established
     */
    flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const { message, userId, onChunk, onComplete } = this.messageQueue.shift();
            this.streamMessage(message, userId, onChunk, onComplete);
        }
    }

    /**
     * Format Turtle AI response
     */
    formatResponse(data) {
        return {
            success: data.success || true,
            response: data.response || data.message,
            quickReplies: data.quick_replies || data.suggestions || [],
            intent: data.intent || 'general',
            confidence: data.confidence || 1.0,
            metadata: data.metadata || {}
        };
    }

    /**
     * Offline fallback responses
     */
    getOfflineResponse(message) {
        const lowerMessage = message.toLowerCase();

        const offlineResponses = {
            doctor: {
                response: '🩺 I can help you find doctors! Our specialists are available for consultations. Please note: I\'m currently offline, but I can still guide you.',
                quickReplies: ['View Doctors', 'Specialties', 'Book Appointment']
            },
            medicine: {
                response: '💊 I can assist with medicine information. While I\'m offline, you can browse our medicine catalog or upload a prescription.',
                quickReplies: ['Browse Medicines', 'Upload Prescription', 'Check Interactions']
            },
            test: {
                response: '🔬 Lab tests can be booked easily. I\'m currently offline, but you can still explore our test packages.',
                quickReplies: ['View Tests', 'Book Test', 'Home Collection']
            },
            default: {
                response: '👋 Hello! I\'m your healthcare assistant. I\'m currently in offline mode, but I can still help you navigate the platform.',
                quickReplies: ['Find Doctors', 'Book Tests', 'Order Medicines', 'Health Records']
            }
        };

        for (const [key, value] of Object.entries(offlineResponses)) {
            if (lowerMessage.includes(key)) {
                return { success: true, ...value };
            }
        }

        return { success: true, ...offlineResponses.default };
    }

    /**
     * Get conversation history
     */
    async getHistory(userId) {
        try {
            const response = await fetch(`${this.baseURL}/api/v1/chat/history/${this.sessionId}?user_id=${userId}`, {
                headers: {
                    ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                }
            });

            if (!response.ok) throw new Error('Failed to fetch history');

            return await response.json();
        } catch (error) {
            console.error('🐢 Failed to get history:', error);
            return { success: false, messages: [] };
        }
    }

    /**
     * Clear conversation
     */
    async clearHistory() {
        try {
            await fetch(`${this.baseURL}/api/v1/chat/history/${this.sessionId}`, {
                method: 'DELETE',
                headers: {
                    ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
                }
            });
            
            this.sessionId = this.generateSessionId();
            return { success: true };
        } catch (error) {
            console.error('🐢 Failed to clear history:', error);
            return { success: false };
        }
    }

    /**
     * Health check
     */
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL}/api/health`);
            const data = await response.json();
            return data.status === 'healthy';
        } catch (error) {
            return false;
        }
    }
}

// Export for use in frontend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TurtleAI;
} else {
    window.TurtleAI = TurtleAI;
}
