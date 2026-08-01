'use client'; // Required for useState and form handling

import React, { useState, FormEvent, ChangeEvent } from 'react';

// Define the form data type
interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  department: string;
  message: string;
}

// Define props interface
interface AppointmentProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (formData: FormData) => void;
  isLoading?: boolean;
  departments?: string[];
}

// Type for form field names (for type-safe handleChange)
type FormField = keyof FormData;

const Appointment: React.FC<AppointmentProps> = ({
  title = "Book an Appointment",
  subtitle = "Fill in the details and we'll get back to you within 24 hours",
  onSubmit,
  isLoading = false,
  departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Radiology'],
}) => {
  // State with proper typing
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    department: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Type-safe change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name as FormField]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\+\-\(\)\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Type-safe submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Appointment booked successfully! We will contact you shortly.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          department: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-16 bg-hospital-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
          <p className="text-gray-600 mt-4">{subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`p-3 border rounded-lg w-full focus:outline-none focus:border-hospital-blue ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`p-3 border rounded-lg w-full focus:outline-none focus:border-hospital-blue ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`p-3 border rounded-lg w-full focus:outline-none focus:border-hospital-blue ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={`p-3 border rounded-lg w-full focus:outline-none focus:border-hospital-blue ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            <div>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`p-3 border rounded-lg w-full focus:outline-none focus:border-hospital-blue ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Any special requests?"
                value={formData.message}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-hospital-blue"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`bg-hospital-blue text-white px-8 py-3 rounded-lg w-full font-semibold transition ${
                isSubmitting || isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </span>
              ) : (
                'Book Appointment'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;