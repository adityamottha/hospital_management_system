'use client';

import React from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar, FaUserCircle } from 'react-icons/fa';

// Define the Testimonial type
interface Testimonial {
  id: string | number;
  name: string;
  text: string;
  rating: number;
  image?: string | any; // For Next.js Image
  role?: string;
  date?: string;
  location?: string;
}

// Define props interface
interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  columns?: 1 | 2 | 3 | 4;
  showRating?: boolean;
  showQuotes?: boolean;
  showAvatar?: boolean;
  showLocation?: boolean;
  backgroundClass?: string;
  onTestimonialClick?: (testimonial: Testimonial) => void;
}

// Default testimonials with images
const defaultTestimonials: Testimonial[] = [
  { 
    id: 1,
    name: 'Mr. Amit Patel', 
    text: 'Excellent care and attention. The doctors truly listen to patients.', 
    rating: 5,
    role: 'Businessman',
    location: 'Mumbai, India',
    date: '2025-01-15'
  },
  { 
    id: 2,
    name: 'Mrs. Sita Sharma', 
    text: 'I had a great experience during my treatment. Highly recommend!', 
    rating: 5,
    role: 'Teacher',
    location: 'Delhi, India',
    date: '2025-01-10'
  },
  { 
    id: 3,
    name: 'Mr. Ravi Kumar', 
    text: 'Professional staff and world-class facilities. Thank you Upadhyay Hospital.', 
    rating: 4,
    role: 'Engineer',
    location: 'Bangalore, India',
    date: '2025-01-05'
  },
];

// Column classes
const columnClasses = {
  1: 'grid-cols-1 max-w-2xl mx-auto',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const Testimonials: React.FC<TestimonialsProps> = ({
  title = "Patient Testimonials",
  subtitle = "What our patients say about us",
  testimonials = defaultTestimonials,
  columns = 3,
  showRating = true,
  showQuotes = true,
  showAvatar = true,
  showLocation = false,
  backgroundClass = "bg-white",
  onTestimonialClick,
}) => {
  const renderStars = (rating: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStar key="half" className="text-yellow-400" />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleTestimonialClick = (testimonial: Testimonial): void => {
    if (onTestimonialClick) {
      onTestimonialClick(testimonial);
    }
  };

  return (
    <section className={`py-16 ${backgroundClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
          {subtitle && (
            <p className="text-gray-600 mt-4">{subtitle}</p>
          )}
        </div>

        <div className={`grid ${columnClasses[columns]} gap-8`}>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-hospital-lightBlue p-8 rounded-xl shadow-lg relative hover:shadow-2xl transition hover:-translate-y-2"
              onClick={() => handleTestimonialClick(testimonial)}
            >
              {/* Quote Icon */}
              {showQuotes && (
                <FaQuoteLeft className="text-hospital-blue text-3xl opacity-20 absolute top-4 right-4" />
              )}

              {/* Avatar */}
              {showAvatar && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-hospital-blue/20 flex items-center justify-center">
                    {testimonial.image ? (
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-hospital-blue" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-hospital-dark">{testimonial.name}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Rating Stars */}
              {showRating && (
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500 ml-2">
                    ({testimonial.rating.toFixed(1)})
                  </span>
                </div>
              )}

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>

              {/* Location */}
              {showLocation && testimonial.location && (
                <p className="text-xs text-gray-400 mt-3">
                  📍 {testimonial.location}
                </p>
              )}

              {/* Date */}
              {testimonial.date && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              )}

              {/* Author (if no avatar) */}
              {!showAvatar && (
                <h4 className="font-bold text-hospital-dark mt-4">- {testimonial.name}</h4>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;