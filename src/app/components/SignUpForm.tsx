import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Added import
import { ClipLoader } from 'react-spinners';

interface AuthError {
  message?: string;
}

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isLoading, setIsLoading, setError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const getErrorMessage = (err: AuthError | string): string => {
    const message = typeof err === 'string' ? err : err.message || '';
    if (/invalid email|wrong email/i.test(message)) return 'Please enter a valid email address.';
    if (/password/i.test(message)) return 'Password must be at least 6 characters.';
    return message || 'An unexpected error occurred. Please try again.';
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Automatically sign in after successful registration
      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        setError(getErrorMessage(signInResult.error));
      } else {
        router.push('/');
      }
    } catch (err) {
      setError(getErrorMessage(err as AuthError));
      console.error('Sign-up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignUp}>
      <div>
        <label className="block font-semibold mb-1 text-left">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Your Name"
          className="bg-white border-solid border border-secondary md:rounded-[20px] rounded-full box-border font-medium text-14 md:px-[13px] md:py-[13px] text-black w-full md:mt-3 mt-2 outline-none focus:outline-none hover:outline-none placeholder:text-[#A2B5D1B3] px-4 py-[10px] disabled:bg-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1 text-left">
          Email <span className="text-red-500">*</span>
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
        <label className="block font-semibold mb-1 text-left">
          Password <span className="text-red-500">*</span>
        </label>
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
      <div>
        <label className="block font-semibold mb-1 text-left">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            <ClipLoader color="#ffffff" loading={isLoading} size={20} />
            <span>Signing up...</span>
          </>
        ) : (
          'Sign up'
        )}
      </button>
    </form>
  );
};

export default SignUpForm;