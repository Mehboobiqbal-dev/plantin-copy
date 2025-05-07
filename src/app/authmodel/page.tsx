'use client';

import React, { useState } from 'react';
import { FaApple, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationsAccepted, setNotificationsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  // Handle Sign-In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        if (result.error.includes('Invalid email or password')) {
          setError('Incorrect email or password. Please try again.');
        } else {
          setError('Sign-in failed. Please try again later.');
        }
      } else {
        router.push('http://localhost:3000/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign-Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the Privacy Policy, Terms of Service, and Subscription Policy.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error.includes('User exists')) {
          setError('An account with this email already exists.');
        } else if (data.error.includes('Invalid input')) {
          setError('Please provide valid name, email, and matching passwords.');
        } else {
          setError(data.error || 'Failed to sign up. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      // After successful sign-up, attempt to sign in
      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        setError('Sign-up successful, but auto sign-in failed. Please sign in manually.');
      } else {
        router.push('http://localhost:3000/');
      }
    } catch (err) {
      setError('An unexpected error occurred during sign-up.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Social Sign-In
  const handleSocialSignIn = async (provider: string) => {
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        setError(`Failed to sign in with ${provider}. Please try again.`);
      } else {
        router.push('http://localhost:3000/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative font-sans">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
        onClick={() => router.push('/')}
      >
        <IoClose size={24} />
      </button>

      <div className="w-1/2 flex flex-col justify-center space-y-6 min-h-screen px-12">
        <div className="flex mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 text-center py-3 font-semibold transition-colors ${
              activeTab === 'signin'
                ? 'text-green-500 border-b-4 border-green-500'
                : 'text-gray-500 border-b-4 border-transparent'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 text-center py-3 font-semibold transition-colors ${
              activeTab === 'signup'
                ? 'text-green-500 border-b-4 border-green-500'
                : 'text-gray-500 border-b-4 border-transparent'
            }`}
          >
            Sign up
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">{error}</div>
        )}

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => handleSocialSignIn('apple')}
            className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaApple />
          </button>
          <button
            onClick={() => handleSocialSignIn('google')}
            className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialSignIn('facebook')}
            className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaFacebookF />
          </button>
        </div>

        <div className="flex items-center mb-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {activeTab === 'signin' ? (
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block font-semibold mb-1 text-left">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="email@email.com"
                className="bg-white border-solid border border-secondary md:rounded-[20px] rounded-full box-border font-medium text-14 md:px-[13px] md:py-[13px] text-black w-full md:mt-3 mt-2 outline-none focus:outline-none hover:outline-none placeholder:text-[#A2B5D1B3] px-4 py-[10px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="block font-semibold mb-1 text-left">
                  Enter password <span className="text-red-500">*</span>
                </label>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-300 text-white py-3 rounded-full font-semibold text-lg hover:from-green-500 hover:to-green-400 focus:outline-none disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block font-semibold mb-1">
                Enter your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="email@email.com"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-semibold mb-1">
                  Enter password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-1">
                  Confirm password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1"
                disabled={isLoading}
              />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <span className="text-green-500 font-medium">
                  Privacy Policy, Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-green-500 font-medium">
                  Subscription Policy
                </span>
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={notificationsAccepted}
                onChange={(e) => setNotificationsAccepted(e.target.checked)}
                className="mt-1"
                disabled={isLoading}
              />
              <label className="text-sm text-gray-600">
                I agree to receive important notifications and updates via email
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-3 rounded-full font-semibold text-lg hover:bg-green-500 focus:outline-none disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing up...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        )}
      </div>

      <div
        className="w-1/2 flex flex-col justify-center space-y-6 min-h-screen px-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(221, 249, 213, 0.8), rgba(190, 255, 228, 0.8)), url('https://strapi.myplantin.com/Sign_up_Illustration_6a13a81c32.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {activeTab === 'signin' ? (
          <>
            <h2 className="text-3xl font-extrabold text-left tracking-tight">
              Having troubles with your plants? Ask the botanist!
            </h2>
            <p className="text-2xl text-left">To get a personalized answer:</p>
            <ul className="m-0 p-0 md:text-[18px] text-[16px] list-none">
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
                <span className="font-bold">Use botanist help feature</span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
                <span className="text-left font-bold">
                  Formulate your question and attach a photo of the whole plant and the affected area
                </span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2 transform -translate-y-2">•</span>
                <span className="font-bold">Receive an answer within 24 hours</span>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-center tracking-tight">
              With PlantIn you can
            </h2>
            <ul className="m-0 p-0 md:text-[18px] text-[16px] list-none">
              <li className="mb-4 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
                <span className="font-bold">
                  Discover any plant in a few seconds by photo or characteristics
                </span>
              </li>
              <li className="mb-4 flex items-start font-poppins">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
                <span className="text-left font-bold">
                  Get some theory to become a real green thumb with our numerous blog rubrics
                </span>
              </li>
              <li className="mb-4 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2 transform -translate-y-2">•</span>
                <span className="text-left text-xl font-bold">
                  Identify and cure plant disease with our custom-made guides
                </span>
              </li>
              <li className="mb-4 flex items-start">
                <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
                <span className="text-left text-xl font-bold">
                  Our experts will help you fight any plant issue with personalized guides
                </span>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;