import React from 'react';

export default function SubmissionSuccess() {
  return (
    <div className="mt-35 max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Submission Successful!</h2>
      <p className="mb-6">Thank you for submitting your design. We have received your entry and will contact you soon.</p>
      <a href="/" className="inline-block px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">Go to Home</a>
    </div>
  );
}
