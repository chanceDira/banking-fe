
"use client";

import { useState } from 'react';

const AccountForm = () => {
  const [iban, setIban] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/create_account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ iban }),
    });

    if (res.ok) {
      alert('Account created successfully');
    } else {
      alert('Error creating account');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Create Account</h2>
      <div>
        <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
          IBAN
        </label>
        <input
          type="text"
          id="iban"
          name="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
        Create Account
      </button>
    </form>
  );
};

export default AccountForm;
