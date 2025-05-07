"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import 'react-spinners/styles.css'; // Ensure spinner styles are included

interface AuthError {
  message?: string;
}

interface SignInFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const SignInForm: React.FC<SignInFormProps> = ({ isLoading, setIsLoading, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const getErrorMessage = (err: AuthError | string): string => {
    const message = typeof err === 'string' ? err : err.message || '';
    if (/invalid email|wrong email/i.test(message)) return 'Please enter a valid email address.';
    if (/password.\*(incorrect|wrong)/i.test(message)) return 'Incorrect password. Please try again.';
    return message || 'An unexpected error occurred. Please try again.';
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate spinner for 7 seconds
      await new Promise(resolve => setTimeout(resolve, 7000));

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        if (/invalid email|wrong email/i.test(result.error)) {
          setError('Incorrect email. Please try again.');
        } else if (/password/i.test(result.error)) {
          setError('Incorrect password. Please try again.');
        } else {
          setError(getErrorMessage(result.error));
        }
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(getErrorMessage(err as AuthError));
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignIn}>
      <div>
        <label className="block font-semibold mb-1 text-left">
          Enter your email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="email@email.com"
          className="bg-white border-solid border border-secondary md:rounded-[20px] rounded-full box-border font-medium text-14 md:px-[13px] md:py-[13px] text-black w-full md:mt-3 mt-2 outline-none focus:outline-none hover:outline-none placeholder:text-[#A2B5D1B3] px-4 py-[10px] disabled:bg-gray-100"
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
          className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-400 to-green-300 text-white py-3 rounded-full font-semibold text-lg hover:from-green-500 hover:to-green-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ClipLoader color="#000000" loading={isLoading} size={5000} />
            <span>Signing in...</span>
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default SignInForm;