import React from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import Shuffle from '../components/Shuffle';

const NinjaXPage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Health Assistant',
      description: 'Chat with our intelligent AI assistant for instant health advice, symptom checking, and medical information.',
      benefits: [
        '24/7 Availability',
        'Multilingual Support',
        'Personalized Recommendations',
        'Voice & Text Interaction'
      ]
    },
    {
      icon: '🎯',
      title: 'Smart Symptom Checker',
      description: 'Describe your symptoms and get AI-powered preliminary diagnosis with recommended next steps.',
      benefits: [
        'Instant Analysis',
        'Risk Assessment',
        'Doctor Recommendations',
        'Emergency Detection'
      ]
    },
    {
      icon: '💊',
      title: 'Medication Reminders',
      description: 'Never miss a dose with intelligent medication tracking and timely reminders.',
      benefits: [
        'Custom Schedules',
        'Refill Alerts',
        'Drug Interaction Warnings',
        'Dosage Tracking'
      ]
    },
    {
      icon: '📊',
      title: 'Health Analytics',
      description: 'Track your health metrics, vitals, and medical history with beautiful visualizations.',
      benefits: [
        'Trend Analysis',
        'Progress Reports',
        'Goal Tracking',
        'Export Reports'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Priya Mehta',
      role: 'Software Engineer',
      rating: 5,
      text: 'NinjaX has transformed how I manage my health. The AI assistant is incredibly helpful and accurate!',
      avatar: '👩‍💼'
    },
    {
      name: 'Rahul Sharma',
      role: 'Business Owner',
      rating: 5,
      text: 'The medication reminders have been a lifesaver. I never miss my doses anymore. Highly recommended!',
      avatar: '👨‍💼'
    },
    {
      name: 'Anjali Patel',
      role: 'Teacher',
      rating: 5,
      text: 'As a busy mom, having 24/7 access to health advice is invaluable. The AI is surprisingly accurate!',
      avatar: '👩‍🏫'
    }
  ];

  return (
    <ScrollStack useWindowScroll={true}>
      {/* Hero Section */}
      <ScrollStackItem>
        <div style={{ textAlign: 'center' }}>
          <Shuffle
            text="NinjaX"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.5}
            triggerOnce={true}
            triggerOnHover={false}
            className="ninjax-title"
            tag="h1"
            style={{ fontSize: '4rem', marginBottom: '1rem' }}
          />
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            Your AI-Powered Health Companion 🚀
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.75)' }}>
            Experience the future of healthcare with NinjaX - an intelligent assistant that combines cutting-edge AI 
            with medical expertise to provide personalized health guidance at your fingertips.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>
              <i className="bi bi-robot" style={{ marginRight: '0.5rem' }}></i>
              Start Chat
            </button>
            <button className="btn" style={{
              fontSize: '1.2rem',
              padding: '1.2rem 2.5rem',
              background: 'transparent',
              border: '2px solid #138808'
            }}>
              <i className="bi bi-play-circle" style={{ marginRight: '0.5rem' }}></i>
              Watch Demo
            </button>
          </div>
        </div>
      </ScrollStackItem>

      {/* Features */}
      {features.map((feature, index) => (
        <ScrollStackItem key={index}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h2 style={{ marginBottom: '1rem' }}>{feature.title}</h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8' }}>
                {feature.description}
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem'
            }}>
              {feature.benefits.map((benefit, idx) => (
                <div key={idx} style={{
                  padding: '1.5rem',
                  background: 'rgba(19, 136, 8, 0.1)',
                  border: '2px solid rgba(19, 136, 8, 0.3)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="bi bi-check-circle-fill" style={{
                    fontSize: '2rem',
                    color: '#138808',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}></i>
                  <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{benefit}</span>
                </div>
              ))}
            </div>

            <button className="btn" style={{ alignSelf: 'center', marginTop: '1rem' }}>
              Learn More <i className="bi bi-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
            </button>
          </div>
        </ScrollStackItem>
      ))}

      {/* Stats Section */}
      <ScrollStackItem>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '3rem' }}>Trusted by Thousands 📈</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #138808, #0090d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                50K+
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem' }}>
                Active Users
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #138808, #0090d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                95%
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem' }}>
                Accuracy Rate
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #138808, #0090d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                1M+
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem' }}>
                Conversations
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #138808, #0090d9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
              4.9⭐
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem' }}>
                User Rating
              </p>
            </div>
          </div>
        </div>
      </ScrollStackItem>

      {/* Testimonials */}
      <ScrollStackItem>
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>What Our Users Say 💬</h2>
          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '25px',
                border: '2px solid rgba(19, 136, 8, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #138808, #0090d9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.3rem', fontSize: '1.5rem' }}>{testimonial.name}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.5rem' }}>
                      {testimonial.role}
                    </p>
                    <div>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill" style={{ color: '#ff6f3d', marginRight: '0.2rem' }}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.8',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollStackItem>

      {/* CTA */}
      <ScrollStackItem>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Ready to Transform Your Health Journey? 🌟
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2.5rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem'
          }}>
            Join thousands of users who are already experiencing smarter, more personalized healthcare.
          </p>
          <button className="btn" style={{
            fontSize: '1.3rem',
            padding: '1.5rem 3rem',
            boxShadow: '0 10px 40px rgba(19, 136, 8, 0.4)'
          }}>
            <i className="bi bi-rocket-takeoff" style={{ marginRight: '0.5rem' }}></i>
            Get Started Free
          </button>
          <p style={{
            marginTop: '1.5rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.95rem'
          }}>
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  );
};

export default NinjaXPage;