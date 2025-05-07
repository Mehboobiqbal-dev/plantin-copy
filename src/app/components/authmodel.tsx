'use client';

import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import SocialButtons from './SocialButtons';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      console.log(`Loading state activated for ${activeTab}`);
    } else {
      console.log(`Loading state deactivated for ${activeTab}`);
    }
  }, [isLoading, activeTab]);

  const handleSocialSignIn = async (provider: 'apple' | 'google' | 'facebook') => {
    setError('');

    try {
      setIsLoading(true);
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        setError(`Failed to sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}. Please try again.`);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(`Social sign-in error (${provider}):`, err);
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
        disabled={isLoading}
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
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            Sign in
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 text-center py-3 font-semibold transition-colors ${
              activeTab === 'signup'
                ? 'text-green-500 border-b-4 border-green-500'
                : 'text-gray-500 border-b-4 border-transparent'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 font-medium bg-red-100 p-3 rounded-lg">{error}</div>
        )}

        <SocialButtons isLoading={isLoading} handleSocialSignIn={handleSocialSignIn} />

        <div className="flex items-center mb-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {activeTab === 'signin' ? (
          <SignInForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        ) : (
          <SignUpForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
          />
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
            <h2 className="text-3xl font-extrabold text-center tracking-tight">With PlantIn you can</h2>
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