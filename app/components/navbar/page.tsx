"use client";
import { FaBars, FaTimes, FaUserMd } from 'react-icons/fa';
import React, { useState } from 'react';

// NOTICE CARD (Moved outside Navbar)
const Notice: React.FC = () => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 p-3 w-full overflow-hidden relative" role="alert">
            {/* Sticky NOTICE heading - positioned absolutely */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-100 pr-4 pl-2">
                <span className="font-bold text-red-700 text-lg whitespace-nowrap">NOTICE :</span>
            </div>
            
            {/* Scrolling text with left padding to avoid overlap */}
            <div className="animate-marquee whitespace-nowrap pl-32">
                <span className="text-red-700">
                    Today clinic will open at 9am to 11am &nbsp;•&nbsp; 
                    Please wear masks &nbsp;•&nbsp; 
                    Social distancing required &nbsp;•&nbsp; 
                    Today clinic will open at 9am to 11am &nbsp;•&nbsp; 
                    Please wear masks &nbsp;•&nbsp; 
                    Social distancing required
                     Today clinic will open at 9am to 11am &nbsp;•&nbsp; 
                    Please wear masks &nbsp;•&nbsp; 
                    Social distancing required
                     Today clinic will open at 9am to 11am &nbsp;•&nbsp; 
                    Please wear masks &nbsp;•&nbsp; 
                    Social distancing required
                     Today clinic will open at 9am to 11am &nbsp;•&nbsp; 
                    Please wear masks &nbsp;•&nbsp; 
                    Social distancing required
                </span>
            </div>
        </div>
    );
}

// NAVBAR
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close mobile menu when a link is clicked
  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Notice placed outside navbar for better spacing */}
      <div className="fixed top-0 w-full z-50">
        <Notice />
        <nav className="bg-[rgb(122,220,180)] shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaUserMd className="text-hospital-blue text-3xl" />
              <span className="text-2xl font-bold text-hospital-dark"> DR
                A.D <span className="text-hospital-blue">Clinic</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-hospital-dark font-medium">
              <a href="#home" className="hover:text-hospital-blue transition-colors">Home</a>
              <a href="#about" className="hover:text-hospital-blue transition-colors">About</a>
              <a href="#services" className="hover:text-hospital-blue transition-colors">Services</a>
              <a href="#departments" className="hover:text-hospital-blue transition-colors">Departments</a>
              <a href="#doctors" className="hover:text-hospital-blue transition-colors">Doctors</a>
              <a href="#contact" className="hover:text-hospital-blue transition-colors">Contact</a>
            </div>

            <div className="hidden md:block">
              <a 
                // href="tel:+911234567890" 
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white py-4 px-4 shadow-lg border-t">
              <a href="#home" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>Home</a>
              <a href="#about" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>About</a>
              <a href="#services" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>Services</a>
              <a href="#departments" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>Departments</a>
              <a href="#doctors" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>Doctors</a>
              <a href="#contact" className="block py-2 hover:text-hospital-blue transition" onClick={closeMenu}>Contact</a>
              <hr className="my-2" />
              <a 
                // href="tel:+911234567890" 
                className=" block py-2 text-hospital-blue font-semibold underline hover:to-blue-600"
                onClick={closeMenu}
              >
                Login
              </a>
            </div>
          )}
        </nav>
      </div>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[120px] md:h-[100px]"></div>
    </>
  );
};

export default Navbar;