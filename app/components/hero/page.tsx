import React from 'react';
import Image from 'next/image';
import { FaAmbulance, FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';
import heroImage from '../../../public/frontendFiles/doctorImage.jpg'; // Add your image

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="home" className="pt-20 bg-hospital-lightBlue">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hospital-dark leading-tight">
            Your Health, <br />
            <span className="text-hospital-blue">Our Priority</span>
          </h1>
          <p className="text-lg text-gray-600">
            A.D Clinic provides comprehensive healthcare services with 
            state-of-the-art facilities and expert medical professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-hospital-blue text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition">
              <FaCalendarCheck /> Book Appointment
            </button>
            <button className="border-2 border-hospital-blue text-hospital-blue px-8 py-3 rounded-full flex items-center gap-2 hover:bg-hospital-blue hover:text-white transition">
              <FaPhoneAlt /> Emergency
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image 
            src={heroImage} 
            alt="Hospital" 
            className="rounded-2xl shadow-2xl"
            width={600}
            height={400}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;