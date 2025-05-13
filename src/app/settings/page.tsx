'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name?: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/authmodel');
    },
  });
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // debugger;

  async function fetchUserData(retryCount = 3, delay = 1000) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        const text = await response.text();
        let errorMessage = `Failed to fetch user (Status: ${response.status})`;
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch (e) {
          console.error('Non-JSON response from /api/user:', text);
        }
        if (response.status === 405 && retryCount > 0) {
          console.warn(`Retrying /api/user (attempt ${4 - retryCount}/3)...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchUserData(retryCount - 1, delay * 2);
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setUser(data);
    } catch (err: any) {
      console.error('Fetch user error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setSuccessMessage(null);

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = `Failed to update password (Status: ${response.status})`;
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch (e) {
          console.error('Non-JSON response from /api/user:', text);
        }
        throw new Error(errorMessage);
      }

      setSuccessMessage('Password updated successfully');
      setNewPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
      setPasswordError(err.message);
    }
  }

  useEffect(() => {
    console.log('Session status:', status, 'Session data:', session);
    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, session]);

  useEffect(() => {
    console.log('State update:', { isLoading, user, error });
  }, [isLoading, user, error]);

  if (status === 'loading' || isLoading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => fetchUserData()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="max-w-md mx-auto mt-8">No user data found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name || 'Not set'}</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Change Password</h2>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}