'use client';
import { motion } from 'framer-motion';

interface BookNowModalProps {
  onClose: () => void;
}

export default function BookNowModal({ onClose }: BookNowModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Book Your 3D Tour</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
          />
          <textarea
            placeholder="Tell us about your project"
            className="w-full p-3 bg-gray-700 rounded-lg text-white"
            rows={4}
          />
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => alert('Booking submitted!')}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}