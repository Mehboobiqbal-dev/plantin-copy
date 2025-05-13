"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  _id?: string;
  name?: string;
  fullName?: string;
  username?: string;
  email: string;
  avatar?: string;
  plantCareReminders?: boolean;
  newArticlesNotifications?: boolean;
}

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [plantCareReminders, setPlantCareReminders] = useState(false);
  const [newArticlesNotifications, setNewArticlesNotifications] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalOldPassword, setModalOldPassword] = useState("");
  const [modalNewPassword, setModalNewPassword] = useState("");
  const [modalConfirmPassword, setModalConfirmPassword] = useState("");

  const fetchUserData = useCallback(async (email: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.status === 404) {
        setError("User not found. Please ensure your email is registered.");
        return;
      }
      if (data.user) {
        setUser(data.user);
        setFullName(data.user.fullName || data.user.name || "");
        setNewEmail(data.user.email || "");
        setAvatar(data.user.avatar || "");
        setPlantCareReminders(data.user.plantCareReminders || false);
        setNewArticlesNotifications(data.user.newArticlesNotifications || false);
      } else {
        setError(data.error || "Failed to load user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      console.log("Redirecting to /auth due to unauthenticated status");
      router.replace("/auth");
      return;
    }
    if (session?.user?.email) {
      console.log("Fetching user data for email:", session.user.email);
      fetchUserData(session.user.email);
    }
  }, [status, session?.user?.email, fetchUserData, router]);

  if (status === "loading" || isLoading) {
    return <div className="p-8">Loading your settings…</div>;
  }

  if (status === "unauthenticated") {
    return <div className="p-8">Please sign in to access settings</div>;
  }

  if (!user) {
    return <div className="p-8">Error loading user data: {error}</div>;
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setError("");
    setSuccess("");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", session?.user?.email || "");
    try {
      const res = await fetch("/api/user/avatar", { method: "POST", body: formData });
      const data = await res.json();
      if (data.avatar) {
        setAvatar(data.avatar);
        setSuccess("Avatar updated successfully");
      } else {
        setError(data.error || "Failed to upload avatar");
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setError("Failed to upload avatar");
    }
  };

  const handleAvatarDelete = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/avatar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        setAvatar("");
        setSuccess("Avatar deleted successfully");
      } else {
        setError(data.error || "Failed to delete avatar");
      }
    } catch (err) {
      console.error("Error deleting avatar:", err);
      setError("Failed to delete avatar");
    }
  };

  const handleFullNameUpdate = async () => {
    if (!fullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email, fullName }),
      });
      const data = await res.json();
      if (data.success) setSuccess("Full name updated successfully");
      else setError(data.error || "Failed to update full name");
    } catch (err) {
      console.error("Error updating full name:", err);
      setError("Failed to update full name");
    }
  };

  const handleEmailUpdate = async () => {
    if (!modalEmail.trim()) {
      setError("Email cannot be empty");
      return;
    }
    if (modalEmail === session?.user?.email) {
      setError("New email must be different from the current email");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentEmail: session?.user?.email, newEmail: modalEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Email updated successfully. Please sign in again.");
        setShowEmailModal(false);
        setTimeout(() => router.replace("/auth"), 2000);
      } else {
        setError(data.error || "Failed to update email");
      }
    } catch (err) {
      console.error("Error updating email:", err);
      setError("Failed to update email");
    }
  };

  const handlePasswordChange = async () => {
    if (!modalOldPassword.trim()) {
      setError("Old password is required");
      return;
    }
    if (modalNewPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }
    if (modalNewPassword !== modalConfirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email, oldPassword: modalOldPassword, newPassword: modalNewPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Password updated successfully");
        setModalOldPassword("");
        setModalNewPassword("");
        setModalConfirmPassword("");
        setShowPasswordModal(false);
      } else {
        setError(data.error || "Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password");
    }
  };

  const handleNotificationUpdate = async (type: "plantCare" | "newArticles", value: boolean) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          plantCareReminders: type === "plantCare" ? value : plantCareReminders,
          newArticlesNotifications: type === "newArticles" ? value : newArticlesNotifications,
        }),
      });
      const data = await res.json();
      if (data.success) {
        type === "plantCare" ? setPlantCareReminders(value) : setNewArticlesNotifications(value);
        setSuccess("Notification settings updated successfully");
      } else {
        setError(data.error || "Failed to update notifications");
      }
    } catch (err) {
      console.error("Error updating notifications:", err);
      setError("Failed to update notification settings");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        router.replace("/auth");
      } else {
        setError(data.error || "Failed to delete account");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <ul>
            <li className="mb-4">
              <button className="w-full text-left px-4 py-2 bg-blue-100 rounded-lg font-semibold">
                Account settings
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={() => router.push("/user/subscription")}
              >
                Subscription info
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Account settings</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">IMAGES</h3>
          <h4 className="text-lg font-semibold mb-4">Avatar</h4>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-500">No Avatar</span>
              )}
            </div>
            <button
              className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              Upload Photo
            </button>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <button
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50"
              onClick={handleAvatarDelete}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">PROFILE INFORMATION</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={handleFullNameUpdate}
                placeholder="Enter your full name (e.g. Sam Brown)"
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Username</label>
              <p className="text-gray-600">{user?.username || user?.name || user?.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">ACCOUNT PREFERENCES</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email"
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => {
                  setModalEmail(newEmail);
                  setShowEmailModal(true);
                }}
                className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                change Email
              </button>
              <p className="text-sm text-gray-500 mt-1">
                You have to verify your email to get personal information from our site
              </p>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password must be at least 6 characters long"
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => {
                  setModalOldPassword("");
                  setModalNewPassword(newPassword);
                  setModalConfirmPassword("");
                  setShowPasswordModal(true);
                }}
                className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                change Password
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">EMAIL NOTIFICATIONS</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">Plant care reminders</label>
              <input
                type="checkbox"
                checked={plantCareReminders}
                onChange={(e) => handleNotificationUpdate("plantCare", e.target.checked)}
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">New articles notifications</label>
              <input
                type="checkbox"
                checked={newArticlesNotifications}
                onChange={(e) => handleNotificationUpdate("newArticles", e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">DELETE ACCOUNT</h3>
          <p className="text-gray-600 mb-4">
            Note that deleting an account does not cancel the subscription! You can change this in your{" "}
            <a href="/user/subscription" className="text-blue-500 hover:underline">
              subscription settings
            </a>
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Email Update Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md flex">
            <div className="absolute inset-y-0 left-0 w-24 bg-blue-50 rounded-l-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0-2h14a4 4 0 014 4v14a4 4 0 01-4 4H5a4 4 0 01-4-4V5a4 4 0 014-4z"/>
                <path d="M12 12c2.5 0 4-2 4-4s-1.5-4-4-4-4 2-4 4 1.5 4 4 4zm0 2c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4z"/>
              </svg>
            </div>
            <div className="pl-28 p-6 flex-1">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowEmailModal(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">Update your email</h2>
              <p className="text-sm text-gray-600 mb-4">
                You can update your email address below. We will send you a verification letter to your new email address. Please do not hesitate to verify your account.
              </p>
              <label className="block text-sm font-medium mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                placeholder="Enter your new email"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleEmailUpdate}
                className="w-full py-2 bg-teal-200 text-teal-800 rounded-full hover:bg-teal-300"
              >
                Change email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md flex">
            <div className="absolute inset-y-0 left-0 w-24 bg-blue-50 rounded-l-2xl flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0-2h14a4 4 0 014 4v14a4 4 0 01-4 4H5a4 4 0 01-4-4V5a4 4 0 014-4z"/>
                <path d="M12 12c2.5 0 4-2 4-4s-1.5-4-4-4-4 2-4 4 1.5 4 4 4zm0 2c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4z"/>
              </svg>
            </div>
            <div className="pl-28 p-6 flex-1">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPasswordModal(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">Update your password</h2>
              <p className="text-sm text-gray-600 mb-4">
                You can update your password below. Please ensure it is at least 6 characters long.
              </p>
              <label className="block text-sm font-medium mb-1">
                Old Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={modalOldPassword}
                onChange={(e) => setModalOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                New Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={modalNewPassword}
                onChange={(e) => setModalNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={modalConfirmPassword}
                onChange={(e) => setModalConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handlePasswordChange}
                className="w-full py-2 bg-teal-200 text-teal-800 rounded-full hover:bg-teal-300"
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}