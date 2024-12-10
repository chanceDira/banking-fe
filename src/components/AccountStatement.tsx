"use client"

import { useState } from 'react';

const StatementForm = () => {
  const [iban, setIban] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTransactions([]);

    try {
      const res = await fetch(`http://localhost:3001/api/account/statement?iban=${iban}`);
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError('Failed to fetch the statement. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold">Get Account Statement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Get Statement
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {transactions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Transaction History</h3>
          <ul className="mt-4 space-y-2">
            {transactions.map((transaction, index) => (
              <li key={index} className="p-4 border border-gray-300 rounded-md">
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Amount:</strong> {transaction.amount}</p>
                <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatementForm;
