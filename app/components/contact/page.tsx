'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FaPhone, FaEnvelope, FaMapMarker, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// Define Contact Info Type
interface ContactInfo {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  details: string[];
}

// Define Form Data Type
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Define Props Interface
interface ContactProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
  socialLinks?: { platform: string; url: string; icon: React.ReactNode }[];
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  isLoading?: boolean;
  mapEmbedUrl?: string;
}

const Contact: React.FC<ContactProps> = ({
  title = "Contact Us",
  subtitle = "We'd love to hear from you. Reach out to us anytime.",
  onSubmit,
  isLoading = false,
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509424!2d144.9537353153167!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f7c3b3%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1644259182000!5m2!1sen!2sus",
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Default Contact Info
  const defaultContactInfo: ContactInfo[] = [
    {
      id: 1,
      icon: <FaMapMarker className="text-hospital-blue text-2xl mt-1" />,
      title: 'Address',
      details: ['123, Hospital Road, City Center,', 'Agra - 400001, India']
    },
    {
      id: 2,
      icon: <FaPhone className="text-hospital-blue text-2xl mt-1" />,
      title: 'Phone',
      details: ['+91 12345 67890', '+91 98765 43210']
    },
    {
      id: 3,
      icon: <FaEnvelope className="text-hospital-blue text-2xl mt-1" />,
      title: 'Email',
      details: ['info@adclinic.com', 'support@adclinic.com']
    },
    {
      id: 4,
      icon: <FaClock className="text-hospital-blue text-2xl mt-1" />,
      title: 'Working Hours',
      details: ['Mon-Sat: 8:00 AM - 8:00 PM', 'Sunday: Emergency Only']
    }
  ];

  // Default Social Links
  const defaultSocialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: <FaFacebook /> },
    { platform: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter /> },
    { platform: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
    { platform: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube /> },
  ];

  const contactInfo = defaultContactInfo;
  const socialLinks = defaultSocialLinks;

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSuccessMessage('');

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
        setSuccessMessage('Thank you! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-hospital-gray">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-20 h-1 bg-hospital-blue mx-auto mt-2"></div>
          {subtitle && (
            <p className="text-gray-600 mt-4">{subtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-start gap-4">
                {info.icon}
                <div>
                  <h4 className="font-bold text-hospital-dark">{info.title}</h4>
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-bold text-hospital-dark mb-3">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-hospital-blue text-white p-3 rounded-full hover:bg-blue-700 transition hover:scale-110"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="pt-4">
              <h4 className="font-bold text-hospital-dark mb-3">Find Us</h4>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-hospital-dark mb-4">Send a Message</h3>
            
            {successMessage && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-hospital-blue ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-hospital-blue ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-blue"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-blue"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-hospital-blue ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
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
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;