import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (


    <div className="min-h-screen bg-gray-100">
    <nav className="bg-blue-600 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link href="/" className="text-xl font-semibold">
          Banking App
        </Link>
        <div>
          <Link href="/account" className="mr-4">Create Account</Link>
          <Link href="/deposit" className="mr-4">Deposit</Link>
          <Link href="/withdraw" className="mr-4">Withdraw</Link>
          <Link href="/transfer" className=" mr-4">Transfer</Link>
          <Link href="/statement" className="mr-4">My Account Statement</Link>
        </div>
      </div>
    </nav>
    <main className="p-4 text-black flex flex-col justify-center items-center gap-3">
    <h1 className="text-3xl font-bold text-center">Welcome to Banking App</h1>
    <p className="mt-4 text-center">Manage your bank transactions with ease.</p>
    </main>
  </div>

  );
}
