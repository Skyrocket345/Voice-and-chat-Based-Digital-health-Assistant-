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
  const testCategories = [
    {
      category: 'Blood Tests',
      icon: '🩸',
      tests: [
        { name: 'Complete Blood Count (CBC)', price: '₹400', duration: '24 hours', description: 'Comprehensive blood analysis including RBC, WBC, Platelets' },
        { name: 'Lipid Profile', price: '₹800', duration: '24 hours', description: 'Cholesterol levels - Total, HDL, LDL, Triglycerides' },
        { name: 'Thyroid Function Test', price: '₹600', duration: '48 hours', description: 'T3, T4, TSH levels for thyroid health' },
        { name: 'Blood Sugar (Fasting & PP)', price: '₹350', duration: '12 hours', description: 'Glucose levels fasting and post-prandial' }
      ]
    },
    {
      category: 'Diagnostic Imaging',
      icon: '📸',
      tests: [
        { name: 'X-Ray', price: '₹500', duration: '2 hours', description: 'Digital radiography for bones and chest' },
        { name: 'Ultrasound', price: '₹1,200', duration: '24 hours', description: 'Sonography for abdominal organs' },
        { name: 'CT Scan', price: '₹4,500', duration: '48 hours', description: 'Detailed cross-sectional imaging' },
        { name: 'MRI Scan', price: '₹6,000', duration: '48 hours', description: 'High-resolution soft tissue imaging' }
      ]
    },
    {
      category: 'Health Packages',
      icon: '📦',
      tests: [
        { name: 'Basic Health Checkup', price: '₹1,500', duration: '48 hours', description: 'CBC, Lipid Profile, Blood Sugar, Liver Function' },
        { name: 'Cardiac Care Package', price: '₹3,500', duration: '48 hours', description: 'ECG, Echo, Cardiac Enzymes, Lipid Profile' },
        { name: 'Diabetes Management', price: '₹2,000', duration: '48 hours', description: 'HbA1c, Fasting Sugar, Kidney Function, Lipid Profile' },
        { name: 'Women Wellness Package', price: '₹2,800', duration: '48 hours', description: 'Thyroid, Vitamin D, Iron, Calcium, Hormonal Panel' }
      ]
    },
    {
      category: 'Specialized Tests',
      icon: '🔬',
      tests: [
        { name: 'Vitamin D Test', price: '₹900', duration: '48 hours', description: '25-OH Vitamin D levels' },
        { name: 'Liver Function Test', price: '₹700', duration: '24 hours', description: 'SGOT, SGPT, Bilirubin, Alkaline Phosphatase' },
        { name: 'Kidney Function Test', price: '₹650', duration: '24 hours', description: 'Creatinine, Urea, BUN, Electrolytes' },
        { name: 'COVID-19 RT-PCR', price: '₹500', duration: '24 hours', description: 'Gold standard COVID-19 detection' }
      ]
    }
  ];

  return (
    <ScrollStack useWindowScroll={true}>
      <ScrollStackItem>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Lab Tests & Diagnostics 🔬</h2>
          <p>Book accurate and affordable lab tests from certified laboratories</p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{
              padding: '0.6rem 1.5rem',
              background: 'rgba(19, 136, 8, 0.2)',
              border: '1px solid rgba(19, 136, 8, 0.4)',
              borderRadius: '25px',
              fontSize: '0.95rem'
            }}>
              ✓ NABL Certified Labs
            </span>
            <span style={{
              padding: '0.6rem 1.5rem',
              background: 'rgba(0, 144, 217, 0.2)',
              border: '1px solid rgba(0, 144, 217, 0.4)',
              borderRadius: '25px',
              fontSize: '0.95rem'
            }}>
              ✓ Home Sample Collection
            </span>
            <span style={{
              padding: '0.6rem 1.5rem',
              background: 'rgba(255, 111, 61, 0.2)',
              border: '1px solid rgba(255, 111, 61, 0.4)',
              borderRadius: '25px',
              fontSize: '0.95rem'
            }}>
              ✓ Fast Reports
            </span>
          </div>
        </div>
      </ScrollStackItem>

      {testCategories.map((category, catIndex) => (
        <ScrollStackItem key={catIndex}>
          <div>
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '3rem' }}>{category.icon}</span>
              {category.category}
            </h2>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {category.tests.map((test, testIndex) => (
                <div key={testIndex} style={{
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{
                        fontSize: '1.4rem',
                        marginBottom: '0.8rem',
                        color: '#0090d9'
                      }}>
                        {test.name}
                      </h3>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.75)',
                        marginBottom: '1rem',
                        lineHeight: '1.6'
                      }}>
                        {test.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}>
                        <div>
                          <span style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: '#138808'
                          }}>
                            {test.price}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          <i className="bi bi-clock"></i>
                          <span>Report in {test.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn" style={{
                      whiteSpace: 'nowrap',
                      alignSelf: 'center'
                    }}>
                      <i className="bi bi-calendar-plus" style={{ marginRight: '0.5rem' }}></i>
                      Book Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollStackItem>
      ))}

      <ScrollStackItem>
        <div style={{ textAlign: 'center' }}>
          <h2>Why Choose Our Lab Services? 🏥</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🎯</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Accurate Results</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Latest technology and qualified technicians ensure precision
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🏠</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Home Collection</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Free sample collection at your doorstep
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>⚡</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Quick Turnaround</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Get your reports digitally within promised time
              </p>
            </div>
          </div>
          <button className="btn" style={{
            marginTop: '2rem',
            fontSize: '1.2rem',
            padding: '1.2rem 2.5rem'
          }}>
            <i className="bi bi-telephone" style={{ marginRight: '0.5rem' }}></i>
            Call for More Information
          </button>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  );
};

export default LabTestsPage;