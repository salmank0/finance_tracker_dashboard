import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      {/* Application Title */}
      <h1 className="text-5xl font-bold mb-8 text-primary">
        Welcome to Personal Finance Tracker
      </h1>

      {/* Application Description */}
      <p className="text-xl mb-8 text-center max-w-2xl">
        Track your income, expenses, and manage your finances effectively with
        our Personal Finance Tracker. Stay on top of your net worth and gain
        control over your financial future.
      </p>

      {/* Links for Registration and Login */}
      <div className="flex space-x-4">
        {/* Registration Link */}
        <Link
          href="/register"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded"
        >
          Register
        </Link>

        {/* Login Link */}
        <Link
          href="/login"
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
