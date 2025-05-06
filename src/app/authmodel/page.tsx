// File: app/authmodel/page.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaApple, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const AuthModel: React.FC = () => {
  // active tab: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // form state for both tabs
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // error message
  const [error, setError] = useState<string | undefined>(undefined);

  // handle sign-in submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (result?.error) setError(result.error);
  };

  // handle sign-up submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    // call registration API
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || data.message);
      return;
    }
    // automatically sign in new user
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (result?.error) setError(result.error);
  };

  // handle input changes
  const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen relative font-sans">
      {/* Close button (implement close logic as needed) */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
        onClick={() => {/* TODO: add close modal logic */}}
      >
        <IoClose size={24} />
      </button>

      {/* Left side: tabs, social buttons, forms */}
      <div className="w-1/2 flex flex-col justify-center space-y-6 min-h-screen px-12">
        {/* Tab headers */}
        <div className="flex mb-8 border-b-2 border-gray-200">
          {['signin', 'signup'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setError(undefined); }}
              className={`flex-1 text-center py-3 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-green-500 border-b-4 border-green-500'
                  : 'text-gray-500 border-b-4 border-transparent'
              }`}
            >
              {tab === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>

        {/* Social login buttons */}
        <div className="flex space-x-4 mb-8">
          {[FaApple, FaGoogle, FaFacebookF].map((Icon, i) => (
            <button
              key={i}
              onClick={() => signIn(Icon === FaGoogle ? 'google' : Icon === FaApple ? 'apple' : 'facebook')}
              className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50"
            >
              <Icon />
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="flex items-center mb-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Show any error */}
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        {/* Sign-in or Sign-up form */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1 text-left">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={updateField('email')}
                placeholder="email@email.com"
                className="bg-white border-solid border border-secondary rounded-full box-border font-medium text-14 px-4 py-[10px] w-full outline-none placeholder:text-[#A2B5D1B3]"
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
                required
                value={form.password}
                onChange={updateField('password')}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-300 text-white py-3 rounded-full font-semibold text-lg hover:from-green-500 hover:to-green-400 focus:outline-none"
            >
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">
                Enter your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={updateField('name')}
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={updateField('email')}
                placeholder="email@email.com"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-semibold mb-1">
                  Enter password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={updateField('password')}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-1">
                  Confirm password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={updateField('confirmPassword')}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" required className="mt-1" />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <span className="text-green-500 font-medium">Privacy Policy, Terms of Service</span> and{' '}
                <span className="text-green-500 font-medium">Subscription Policy</span>
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <label className="text-sm text-gray-600">
                I agree to receive important notifications and updates via email
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-3 rounded-full font-semibold text-lg hover:bg-green-500 focus:outline-none"
            >
              Sign up
            </button>
          </form>
        )}
      </div>

      {/* Right side: illustration and marketing copy */}
      <div
        className="w-1/2 flex flex-col justify-center space-y-6 min-h-screen px-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(221, 249, 213, 0.8), rgba(190, 255, 228, 0.8)), url('https://strapi.myplantin.com/Sign_up_Illustration_6a13a81c32.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Conditional copy based on tab */}
        {activeTab === 'signin' ? (
          <>
            <h2 className="text-3xl font-extrabold text-left tracking-tight">
              Having troubles with your plants? Ask the botanist!
            </h2>
            <p className="text-2xl text-left">To get a personalized answer:</p>
            <ul className="list-none m-0 p-0 md:text-[18px] text-[16px]">
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold mr-2">•</span>
                <span className="font-bold">Use botanist help feature</span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold mr-2">•</span>
                <span className="font-bold text-left">Formulate your question and attach a photo of the whole plant and the affected area</span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="text-3xl text-gray-500 font-bold transform -translate-y-2 mr-2">•</span>
                <span className="font-bold">Receive an answer within 24 hours</span>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-center tracking-tight">With PlantIn you can</h2>
            <ul className="list-none m-0 p-0 md:text-[18px] text-[16px]">
              <li className="mb-4 flex items-start">
                <span className="text-3xl text-gray-500 font-bold mr-2">•</span>
                <span className="font-bold">Discover any plant in a few seconds by photo or characteristics</span>
              </li>
              <li className="mb-4 flex items-start font-poppins">
                <span className="text-3xl text-gray-500 font-bold mr-2">•</span>
                <span className="font-bold text-left">Get some theory to become a real green thumb with our numerous blog rubrics</span>
              </li>
              <li className="mb-4 flex items-start">
                <span className="text-3xl text-gray-500 font-bold transform -translate-y-2 mr-2">•</span>
                <span className="font-bold text-left text-xl">Identify and cure plant disease with our custom-made guides</span>
              </li>
              <li className="mb-4 flex items-start">

    <span className="text-3xl text-gray-500 font-bold leading-[1.2] mr-2">•</span>
    <span className='text-left text-xl font-bold'>Our experts will help you fight any plant issue with personalized guides</span>
  </li>
</ul>

          </>
        )}
      </div>
    </div>
  );
};

export default AuthModel;
