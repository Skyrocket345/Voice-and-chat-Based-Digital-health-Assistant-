import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 Namaste! I'm Dr. AI, your personal health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ['Find Doctors', 'Book Lab Tests', 'Order Medicines', 'Health Records']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
      return {
        text: "I can help you find the best doctors! What specialty are you looking for? We have cardiologists, dermatologists, pediatricians, and many more.",
        quickReplies: ['Cardiologist', 'Dermatologist', 'General Physician', 'View All Doctors']
      };
    } else if (lowerMessage.includes('lab') || lowerMessage.includes('test')) {
      return {
        text: "🔬 We offer comprehensive lab testing with home collection. What type of test are you interested in?",
        quickReplies: ['Blood Tests', 'Full Body Checkup', 'Diabetes Tests', 'View All Tests']
      };
    } else if (lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
      return {
        text: "💊 I can help you find medicines and understand their usage. What medication information do you need?",
        quickReplies: ['Search Medicine', 'Upload Prescription', 'Medicine Reminders']
      };
    } else if (lowerMessage.includes('symptom')) {
      return {
        text: "🩺 I can help analyze your symptoms. Please describe what you're experiencing, and I'll provide preliminary guidance. Remember, this doesn't replace professional medical advice.",
        quickReplies: ['Fever', 'Headache', 'Stomach Pain', 'Other Symptoms']
      };
    } else if (lowerMessage.includes('health tip') || lowerMessage.includes('advice')) {
      return {
        text: "💚 Here are some quick health tips:\n\n1. Drink 8 glasses of water daily\n2. Get 7-8 hours of sleep\n3. Exercise for 30 minutes daily\n4. Eat balanced meals\n5. Regular health checkups",
        quickReplies: ['More Tips', 'Book Checkup', 'Nutrition Advice']
      };
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return {
        text: "🚨 For medical emergencies, please call 102 (Ambulance) or 108 (Emergency) immediately! I can also help you find the nearest hospital.",
        quickReplies: ['Find Hospital', 'Call Ambulance', 'First Aid Tips']
      };
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        text: "Hello! 👋 I'm here to help you with all your health needs. What can I assist you with today?",
        quickReplies: ['Find Doctors', 'Book Tests', 'Check Symptoms', 'Health Tips']
      };
    } else if (lowerMessage.includes('thank')) {
      return {
        text: "You're welcome! 😊 Is there anything else I can help you with?",
        quickReplies: ['Find Doctors', 'Book Tests', 'Health Records', 'Main Menu']
      };
    } else {
      return {
        text: "I'm here to assist you with healthcare needs. You can ask me about:\n\n• Finding doctors\n• Booking lab tests\n• Ordering medicines\n• Health advice\n• Symptom checking\n\nWhat would you like to know?",
        quickReplies: ['Find Doctors', 'Book Lab Tests', 'Order Medicines', 'Health Records']
      };
    }
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-avatar">
            <i className="bi bi-robot"></i>
          </div>
          <div>
            <h3>Dr. AI Assistant</h3>
            <p className="chatbot-status">
              <span className="status-dot"></span>
              Always Available
            </p>
          </div>
        </div>
        <div className="chatbot-header-right">
          <button className="icon-btn" title="Voice Input">
            <i className="bi bi-mic"></i>
          </button>
          <button className="icon-btn" title="Settings">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.sender}`}>
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
            
            {message.quickReplies && (
              <div className="quick-replies">
                {message.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-bubble typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chatbot-input-area">
        <button className="icon-btn" title="Attach File">
          <i className="bi bi-paperclip"></i>
        </button>
        <input
          ref={inputRef}
          type="text"
          className="chatbot-input"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-btn" 
          onClick={handleSend}
          disabled={inputText.trim() === ''}
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>

      {/* Suggested Actions */}
      <div className="suggested-actions">
        <button className="action-chip" onClick={() => handleQuickReply('Find Doctors')}>
          <i className="bi bi-person-hearts"></i> Find Doctors
        </button>
        <button className="action-chip" onClick={() => handleQuickReply('Book Lab Tests')}>
          <i className="bi bi-clipboard-pulse"></i> Lab Tests
        </button>
        <button className="action-chip" onClick={() => handleQuickReply('Check Symptoms')}>
          <i className="bi bi-heart-pulse"></i> Symptoms
        </button>
        <button className="action-chip" onClick={() => handleQuickReply('Health Tips')}>
          <i className="bi bi-lightbulb"></i> Health Tips
        </button>
      </div>
    </div>
  );
};

export default ChatBotPage;
