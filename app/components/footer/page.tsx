'use client';

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaAmbulance, FaCalendarCheck } from 'react-icons/fa';

// Define types
interface SocialLink {
  platform: string;
  icon: React.ReactNode;
  url: string;
  hoverColor?: string;
}

interface QuickLink {
  label: string;
  href: string;
}

interface SupportItem {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

interface FooterProps {
  clinicName?: string;
  clinicTagline?: string;
  year?: number;
  quickLinks?: QuickLink[];
  supportItems?: SupportItem[];
  socialLinks?: SocialLink[];
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Footer: React.FC<FooterProps> = ({
  clinicName = "DR A.D Clinic",
  clinicTagline = "Compassionate care, medical excellence since 2020.",
  year = new Date().getFullYear(),
  quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Departments', href: '#departments' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Contact', href: '#contact' },
  ],
  supportItems = [
    { icon: <FaPhone className="inline mr-2" />, label: 'Emergency', value: '+91 12345 67890' },
    { icon: <FaAmbulance className="inline mr-2" />, label: 'Ambulance', value: '108' },
    { icon: <FaCalendarCheck className="inline mr-2" />, label: 'Appointments', value: '+91 98765 43210' },
  ],
  socialLinks = [
    { platform: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com', hoverColor: 'hover:text-blue-600' },
    { platform: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com', hoverColor: 'hover:text-blue-400' },
    { platform: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com', hoverColor: 'hover:text-pink-600' },
    { platform: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com', hoverColor: 'hover:text-blue-700' },
  ],
  backgroundColor = "bg-[rgb(191,255,230)]",
  textColor = "text-gray-700",
  borderColor = "border-gray-300",
}) => {
  // Split clinic name for styling
  const [namePart, clinicPart] = clinicName.split('Clinic');

  return (
    <footer className={`${backgroundColor} py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 ${textColor}">
              {namePart}
              <span className="text-hospital-blue">Clinic</span>
            </h3>
            <p className={`${textColor} opacity-80 text-sm leading-relaxed`}>
              {clinicTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold mb-4 ${textColor}`}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className={`${textColor} opacity-80 hover:opacity-100 transition text-sm`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`font-bold mb-4 ${textColor}`}>Support</h4>
            <ul className="space-y-3">
              {supportItems.map((item, index) => (
                <li key={index} className={`${textColor} opacity-80 text-sm flex items-start`}>
                  <span className="text-hospital-blue mr-2 mt-0.5">{item.icon}</span>
                  <div>
                    <span className="font-medium">{item.label}:</span>{' '}
                    <span>{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={`font-bold mb-4 ${textColor}`}>Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textColor} text-2xl hover:text-hospital-blue transition hover:scale-110 ${social.hoverColor || ''}`}
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h5 className={`font-semibold ${textColor} text-sm mb-2`}>Subscribe to Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border rounded-l-lg focus:outline-none focus:border-hospital-blue"
                />
                <button className="bg-hospital-blue text-white px-4 py-2 text-sm rounded-r-lg hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t ${borderColor} mt-8 pt-8 text-center ${textColor} opacity-80`}>
          <p className="text-sm">
            © {year} {clinicName.replace('DR ', '').replace('Clinic', '').trim()} Clinic. All Rights Reserved.
          </p>
          <p className="text-xs mt-1 opacity-60">
            Designed with ❤️ for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;