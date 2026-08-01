'use client';

import React from 'react';
import Image from 'next/image';
import { FaStar, FaUserMd } from 'react-icons/fa';

// Define the Doctor type
interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image?: string | any; // For Next.js Image
}

// Define props interface
interface DoctorsProps {
  title?: string;
  subtitle?: string;
  doctors?: Doctor[];
  onBookAppointment?: (doctorName: string) => void;
}

const defaultDoctors: Doctor[] = [
  { name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', rating: 4.8 },
  { name: 'Dr. Sunita Singh', specialty: 'Neurologist', experience: '12 years', rating: 4.9 },
  { name: 'Dr. Anil Sharma', specialty: 'Orthopedic Surgeon', experience: '18 years', rating: 4.7 },
  { name: 'Dr. Priya Patel', specialty: 'Pediatrician', experience: '10 years', rating: 4.6 },
];

const Doctors: React.FC<DoctorsProps> = ({
  title = "Meet Our Doctors",
  subtitle = "Expert medical professionals committed to your health",
  doctors = defaultDoctors,
  onBookAppointment,
}) => {
  const renderStars = (rating: number) => {
    // ... star rendering logic (same as above)
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <section id="doctors" className="py-16 bg-hospital-lightBlue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
          <p className="text-gray-600 mt-4">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition hover:-translate-y-2"
            >
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden bg-hospital-lightBlue flex items-center justify-center">
                {doctor.image ? (
                  <Image 
                    src={doctor.image}
                    alt={doctor.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaUserMd className="text-4xl text-hospital-blue" />
                )}
              </div>
              <h3 className="text-xl font-bold mt-4 text-hospital-dark">{doctor.name}</h3>
              <p className="text-hospital-blue font-medium">{doctor.specialty}</p>
              <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
              <div className="flex justify-center items-center gap-1 mt-2">
                {renderStars(doctor.rating)}
                <span className="text-gray-600 text-sm ml-1">({doctor.rating})</span>
              </div>
              <button 
                className="mt-4 bg-hospital-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition w-full"
                onClick={() => {
                  if (onBookAppointment) {
                    onBookAppointment(doctor.name);
                  } else {
                    console.log(`Book appointment with ${doctor.name}`);
                  }
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;