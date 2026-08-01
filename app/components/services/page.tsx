'use client';

import React from 'react';
import { 
  FaHeartbeat, 
  FaBaby, 
  FaBone, 
  FaBrain, 
  FaEye, 
  FaLungs 
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// Define the Service type
interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// Define props interface
interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  columns?: 1 | 2 | 3 | 4;
  showLearnMore?: boolean;
  onLearnMore?: (serviceTitle: string) => void;
}

// Default services data
const defaultServices: Service[] = [
  { icon: <FaHeartbeat />, title: 'Cardiology', desc: 'Advanced heart care with modern cath lab' },
  { icon: <FaBaby />, title: 'Pediatrics', desc: 'Comprehensive child healthcare services' },
  { icon: <FaBone />, title: 'Orthopedics', desc: 'Joint replacements & sports medicine' },
  { icon: <FaBrain />, title: 'Neurology', desc: 'Brain & nervous system treatments' },
  { icon: <FaEye />, title: 'Ophthalmology', desc: 'Complete eye care & surgeries' },
  { icon: <FaLungs />, title: 'Pulmonology', desc: 'Respiratory & lung disease care' },
];

// Column classes mapping
const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const Services: React.FC<ServicesProps> = ({
  title = "Our Services",
  subtitle = "Comprehensive healthcare services tailored to your needs",
  services = defaultServices,
  columns = 3,
  showLearnMore = true,
  onLearnMore,
}) => {
  const handleLearnMore = (serviceTitle: string) => {
    if (onLearnMore) {
      onLearnMore(serviceTitle);
    } else {
      console.log(`Learn more about ${serviceTitle}`);
    }
  };

  return (
    <section id="services" className="py-16 bg-hospital-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
          <p className="text-gray-600 mt-4">{subtitle}</p>
        </div>

        <div className={`grid ${columnClasses[columns]} gap-8`}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 cursor-pointer"
              onClick={() => handleLearnMore(service.title)}
            >
              <div className="text-hospital-blue text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-hospital-dark mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
              {showLearnMore && (
                <button 
                  className="mt-4 text-hospital-blue font-medium hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLearnMore(service.title);
                  }}
                >
                  Learn More →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;