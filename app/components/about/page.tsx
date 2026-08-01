'use client';

import React from 'react';
import Image from 'next/image';
import { FaAward, FaUserMd, FaStethoscope, FaHospital } from 'react-icons/fa';
import hospitalImage from "../../../public/frontendFiles/hospitalImage.jpg";

interface StatItem {
  icon: React.ReactNode;
  label: string;
}

interface AboutProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string | any; // For Next.js Image
  imageAlt?: string;
  stats?: StatItem[];
  yearsOfService?: string;
  specialistDoctors?: string;
  departments?: string;
  beds?: string;
}

const About: React.FC<AboutProps> = ({
  title = "About Us",
  subtitle = "A Legacy of Excellence in Healthcare",
  description = "Established in 2025, A.D Clinic has been serving the community with compassion, integrity, and medical excellence. Our 200-bed facility is equipped with modern technology and staffed by over 150 specialists.",
  imageSrc = hospitalImage,
  imageAlt = "Hospital interior",
  stats = [
    { icon: <FaAward className="text-hospital-blue text-2xl" />, label: "25+ Years of Service" },
    { icon: <FaUserMd className="text-hospital-blue text-2xl" />, label: "150+ Specialist Doctors" },
    { icon: <FaStethoscope className="text-hospital-blue text-2xl" />, label: "30+ Departments" },
    { icon: <FaHospital className="text-hospital-blue text-2xl" />, label: "200+ Beds" },
  ],
}) => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Image 
              src={imageSrc}
              alt={imageAlt} 
              className="rounded-xl shadow-lg"
              width={600}
              height={400}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-hospital-dark">
              {subtitle}
            </h3>
            <p className="text-gray-600">
              {description}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  {stat.icon}
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;