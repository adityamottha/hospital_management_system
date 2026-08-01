'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa';

interface SignUpFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface SignUpProps {
  onSignUp?: (data: SignUpFormData) => Promise<void>;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>('');
  const [signUpSuccess, setSignUpSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setSignUpError('');
    setSignUpSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[\d\+\-\(\)\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (onSignUp) {
        await onSignUp(formData);
      } else {
        // Default signup simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if email already exists (demo)
        if (formData.email === 'demo@clinic.com') {
          setSignUpError('This email is already registered. Please login.');
          setIsLoading(false);
          return;
        }

        setSignUpSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignUpError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-hospital-blue transition text-sm">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-bold text-hospital-dark">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us and get access to premium healthcare services
          </p>
        </div>

        {/* Success/Error Messages */}
        {signUpSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            {signUpSuccess}
          </div>
        )}
        {signUpError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {signUpError}
          </div>
        )}

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
                required
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+91 98765 43210"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Must contain at least 6 characters, uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-hospital-blue focus:ring-hospital-blue border-gray-300 rounded mt-0.5"
              />
            </div>
            <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link href="/terms" className="text-hospital-blue hover:underline">
                Terms and Conditions
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-hospital-blue hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm -mt-2">{errors.termsAccepted}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-hospital-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaFacebook className="text-blue-600" /> Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-hospital-blue hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;