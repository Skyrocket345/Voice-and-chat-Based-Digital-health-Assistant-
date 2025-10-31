import React from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const HealthRecordsPage = () => {
  const healthRecords = [
    {
      type: 'Blood Test - Complete Blood Count',
      date: 'October 25, 2025',
      icon: '🩸',
      lab: 'Apollo Diagnostics, Thane',
      doctor: 'Dr. Rajesh Kumar (Cardiologist)',
      status: 'Normal'
    },
    {
      type: 'Prescription - Hypertension Medication',
      date: 'October 20, 2025',
      icon: '💊',
      doctor: 'Dr. Amit Patel (General Physician)',
      medicines: 'Amlodipine 5mg, Metoprolol 25mg',
      status: 'Active'
    },
    {
      type: 'Visit Summary - General Checkup',
      date: 'October 15, 2025',
      icon: '📋',
      doctor: 'Dr. Priya Sharma (Dermatologist)',
      diagnosis: 'Routine skin examination - No issues found',
      status: 'Completed'
    },
    {
      type: 'Lab Report - Lipid Profile',
      date: 'October 10, 2025',
      icon: '🔬',
      lab: 'Suburban Diagnostics, Mumbai',
      result: 'Cholesterol levels within normal range',
      status: 'Normal'
    },
    {
      type: 'Prescription - Vitamin D Supplement',
      date: 'October 5, 2025',
      icon: '💊',
      doctor: 'Dr. Sunita Reddy (Pediatrician)',
      medicines: 'Vitamin D3 60,000 IU weekly for 8 weeks',
      status: 'Active'
    }
  ];

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
    }
  ];

  const stats = [
    { icon: '📊', count: '12', label: 'Lab Reports' },
    { icon: '💊', count: '8', label: 'Prescriptions' },
    { icon: '📋', count: '4', label: 'Visit Summaries' },
    { icon: '🩺', count: '3', label: 'Active Treatments' }
  ];

  return (
    <ScrollStack useWindowScroll={true}>
      {/* Header Section */}
      <ScrollStackItem>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>My Health Records & Lab Tests 🏥</h2>
          <p>Manage your medical records and book lab tests - all in one place</p>
          
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'rgba(19, 136, 8, 0.1)',
                border: '2px solid rgba(19, 136, 8, 0.3)',
                borderRadius: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#138808', marginBottom: '0.3rem' }}>
                  {stat.count}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <button className="btn">
              <i className="bi bi-cloud-upload" style={{ marginRight: '0.5rem' }}></i>
              Upload Record
            </button>
            <button className="btn" style={{
              background: 'transparent',
              border: '2px solid #0090d9'
            }}>
              <i className="bi bi-download" style={{ marginRight: '0.5rem' }}></i>
              Export All
            </button>
          </div>
        </div>
      </ScrollStackItem>

      {/* Health Records Section */}
      <ScrollStackItem>
        <div>
          <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📁</span>
            Recent Health Records
          </h2>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {healthRecords.map((record, index) => (
              <div key={index} style={{
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
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '0.8rem'
                    }}>
                      <span style={{ fontSize: '2rem' }}>{record.icon}</span>
                      <div>
                        <h3 style={{
                          fontSize: '1.3rem',
                          marginBottom: '0.3rem',
                          color: '#0090d9'
                        }}>
                          {record.type}
                        </h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                          {record.date}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                      {record.lab && <p><i className="bi bi-hospital" style={{ marginRight: '0.5rem' }}></i>{record.lab}</p>}
                      {record.doctor && <p><i className="bi bi-person-badge" style={{ marginRight: '0.5rem' }}></i>{record.doctor}</p>}
                      {record.medicines && <p><i className="bi bi-capsule" style={{ marginRight: '0.5rem' }}></i>{record.medicines}</p>}
                      {record.diagnosis && <p><i className="bi bi-clipboard-check" style={{ marginRight: '0.5rem' }}></i>{record.diagnosis}</p>}
                      {record.result && <p><i className="bi bi-check-circle" style={{ marginRight: '0.5rem' }}></i>{record.result}</p>}
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <span style={{
                        padding: '0.4rem 1rem',
                        background: record.status === 'Normal' || record.status === 'Completed' ? 'rgba(19, 136, 8, 0.2)' : 'rgba(0, 144, 217, 0.2)',
                        border: `1px solid ${record.status === 'Normal' || record.status === 'Completed' ? 'rgba(19, 136, 8, 0.4)' : 'rgba(0, 144, 217, 0.4)'}`,
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        Status: {record.status}
                      </span>
                    </div>
                  </div>
                  
                  <button className="btn" style={{
                    whiteSpace: 'nowrap',
                    alignSelf: 'center'
                  }}>
                    <i className="bi bi-eye" style={{ marginRight: '0.5rem' }}></i>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollStackItem>

      {/* Lab Tests Section - Categories */}
      {testCategories.map((category, catIndex) => (
        <ScrollStackItem key={catIndex}>
          <div>
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '3rem' }}>{category.icon}</span>
              {category.category} - Book Now
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

      {/* Benefits Section */}
      <ScrollStackItem>
        <div style={{ textAlign: 'center' }}>
          <h2>Why Manage Health Records with MediSage? 🌟</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Secure Storage</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Bank-level encryption for all your medical records
              </p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Access Anywhere</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                View and share records on any device, anytime
              </p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Home Collection</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Free sample collection at your doorstep
              </p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#138808', marginBottom: '0.5rem' }}>Fast Reports</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Quick turnaround with digital report delivery
              </p>
            </div>
          </div>
          <button className="btn" style={{
            marginTop: '2rem',
            fontSize: '1.2rem',
            padding: '1.2rem 2.5rem'
          }}>
            <i className="bi bi-telephone" style={{ marginRight: '0.5rem' }}></i>
            Contact Support
          </button>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  );
};

export default HealthRecordsPage;
