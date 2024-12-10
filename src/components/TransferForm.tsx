"use client"

import { useState } from 'react';

const TransferForm = () => {
  const [fromIban, setFromIban] = useState('');
  const [toIban, setToIban] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromIban,
        toIban,
        amount: parseFloat(amount),
      }),
    });

    if (res.ok) {
      alert('Transfer successful');
      setFromIban('');
      setToIban('');
      setAmount('');
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.error}`);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Transfer Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fromIban" className="block text-sm font-medium text-gray-700">
            From IBAN
          </label>
          <input
            type="text"
            id="fromIban"
            name="fromIban"
            value={fromIban}
            onChange={(e) => setFromIban(e.target.value)}
            required
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="toIban" className="block text-sm font-medium text-gray-700">
            To IBAN
          </label>
          <input
            type="text"
            id="toIban"
            name="toIban"
            value={toIban}
            onChange={(e) => setToIban(e.target.value)}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
