import React from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const LabTestsPage = () => {
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