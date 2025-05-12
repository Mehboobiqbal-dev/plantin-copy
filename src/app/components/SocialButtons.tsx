import React from 'react';
import { FaApple, FaGoogle, FaFacebookF } from 'react-icons/fa';

interface SocialButtonsProps {
  isLoading: boolean;
  handleSocialSignIn: (provider: 'apple' | 'google' | 'facebook') => void;
  activeTab: 'signin' | 'signup';
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ isLoading, handleSocialSignIn, activeTab }) => {
  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={() => handleSocialSignIn('apple')}
        className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <FaApple />
      </button>
      <button
        onClick={() => handleSocialSignIn('google')}
        className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <FaGoogle />
      </button>
      <button
        onClick={() => handleSocialSignIn('facebook')}
        className="flex-1 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <FaFacebookF />
      </button>
    </div>
  );
};

export default SocialButtons;