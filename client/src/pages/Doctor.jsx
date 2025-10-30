import React from 'react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const DoctorPage = () => {
  const doctors = [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: 15,
      rating: 4.5,
      reviews: 234,
      availability: 'Mon, Wed, Fri',
      expertise: ['Heart Disease', 'Cardiac Surgery', 'ECG', 'Stress Testing'],
      education: 'MBBS, MD (Cardiology), AIIMS Delhi',
      languages: ['English', 'Hindi', 'Bengali']
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      experience: 12,
      rating: 5.0,
      reviews: 189,
      availability: 'Tue, Thu, Sat',
      expertise: ['Skin Care', 'Acne Treatment', 'Cosmetic Dermatology', 'Hair Loss'],
      education: 'MBBS, MD (Dermatology), Mumbai University',
      languages: ['English', 'Hindi', 'Marathi']
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'General Physician',
      experience: 20,
      rating: 4.2,
      reviews: 456,
      availability: 'Mon-Sat',
      expertise: ['General Medicine', 'Diabetes', 'Hypertension', 'Preventive Care'],
      education: 'MBBS, MD (Internal Medicine), GMC Surat',
      languages: ['English', 'Hindi', 'Gujarati']
    },
    {
      name: 'Dr. Sunita Reddy',
      specialty: 'Pediatrician',
      experience: 10,
      rating: 4.7,
      reviews: 312,
      availability: 'Mon, Wed, Fri',
      expertise: ['Child Health', 'Vaccinations', 'Growth Disorders', 'Nutrition'],
      education: 'MBBS, MD (Pediatrics), CMC Vellore',
      languages: ['English', 'Hindi', 'Telugu']
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'Orthopedic Surgeon',
      experience: 18,
      rating: 4.3,
      reviews: 278,
      availability: 'Tue, Thu, Sat',
      expertise: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Arthroscopy'],
      education: 'MBBS, MS (Orthopedics), PGI Chandigarh',
      languages: ['English', 'Hindi', 'Punjabi']
    },
    {
      name: 'Dr. Neha Gupta',
      specialty: 'Gynecologist',
      experience: 14,
      rating: 4.9,
      reviews: 421,
      availability: 'Mon-Fri',
      expertise: ['Pregnancy Care', 'Gynecological Surgery', 'Infertility', 'Menopause'],
      education: 'MBBS, MS (OB/GYN), JIPMER Puducherry',
      languages: ['English', 'Hindi', 'Tamil']
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill" style={{ color: '#ff6f3d' }}></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half" style={{ color: '#ff6f3d' }}></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star" style={{ color: '#ff6f3d' }}></i>);
    }
    return stars;
  };

  return (
    <ScrollStack useWindowScroll={true}>
      <ScrollStackItem>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Find Expert Doctors 🩺</h2>
          <p>Connect with the best healthcare professionals for your needs</p>
        </div>
      </ScrollStackItem>

      {doctors.map((doctor, index) => (
        <ScrollStackItem key={index}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #138808, #0090d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: 'white',
              flexShrink: 0
            }}>
              <i className="bi bi-person-fill"></i>
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{doctor.name}</h3>
              <p style={{ fontSize: '1.2rem', color: '#0090d9', marginBottom: '1rem' }}>
                {doctor.specialty} • {doctor.experience} years experience
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                {renderStars(doctor.rating)}
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: '0.5rem' }}>
                  {doctor.rating} ({doctor.reviews} reviews)
                </span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.5rem' }}>
                  <i className="bi bi-calendar-check" style={{ marginRight: '0.5rem' }}></i>
                  Available: {doctor.availability}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.5rem' }}>
                  <i className="bi bi-mortarboard" style={{ marginRight: '0.5rem' }}></i>
                  {doctor.education}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  <i className="bi bi-translate" style={{ marginRight: '0.5rem' }}></i>
                  {doctor.languages.join(', ')}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#138808', marginBottom: '0.8rem' }}>
                  Areas of Expertise
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {doctor.expertise.map((skill, idx) => (
                    <span key={idx} style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(19, 136, 8, 0.2)',
                      border: '1px solid rgba(19, 136, 8, 0.4)',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.85)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="btn">
                <i className="bi bi-calendar-plus" style={{ marginRight: '0.5rem' }}></i>
                Book Appointment
              </button>
            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
};

export default DoctorPage;