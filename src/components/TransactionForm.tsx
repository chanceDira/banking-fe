"use client";

import { useState } from 'react';

const TransactionForm = ({ type }: { type: 'deposit' | 'withdraw' }) => {
  const [iban, setIban] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/api/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ iban, amount: parseFloat(amount) }),
    });

    if (res.ok) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
    } else {
      alert(`Error during ${type}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)} Money</h2>
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
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    </form>
  );
};

export default TransactionForm;
