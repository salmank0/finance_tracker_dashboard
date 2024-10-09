"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUIContext } from "@/context/UIContext";
import userServices from "@/services/userServices";
import transactionServices from "@/services/transactionServices";
import TransactionForm from "@/components/pages/dashboard/TransactionForm";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { showLoader, hideLoader, showToast } = useUIContext();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token is found
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    showLoader();
    try {
      const userResponse = await userServices.getUser();
      const transactionsResponse = await transactionServices.getTransactions();
      setUser(userResponse.data.data);
      setTransactions(transactionsResponse.data.data);
      showToast("Data loaded successfully!", "success");
    } catch (error) {
      showToast("Failed to load data", "error");
    } finally {
      hideLoader();
    }
  };

  const openAddTransactionForm = () => {
    setEditingTransaction(null);
    setIsFormVisible(true);
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormVisible(true);
  };

  const deleteTransaction = async (id) => {
    showLoader();
    try {
      await transactionServices.deleteTransaction(id);
      showToast("Transaction deleted successfully!", "success");
      fetchTransactions();
    } catch (error) {
      showToast("Failed to delete transaction", "error");
    } finally {
      hideLoader();
    }
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const calculateNetWorth = () => {
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const expenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    return income - expenses;
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 md:px-8 py-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome, {user?.name}
          </h1>
          <p className="mt-2 text-lg">
            Here’s a summary of your financial data.
          </p>
        </div>
        <button
          onClick={openAddTransactionForm}
          className="bg-primary text-white px-4 py-2 rounded mt-4 md:mt-0"
        >
          Add Transaction
        </button>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Net Worth</h2>
        <div className="text-3xl font-bold mt-4">
          ₹{calculateNetWorth().toLocaleString()}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="bg-neutral-light dark:bg-neutral-dark p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">
                    {transaction.type === "INCOME" ? "Income" : "Expense"}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {transaction.date}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg">
                    ₹{transaction.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => editTransaction(transaction)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </section>

      {isFormVisible && (
        <TransactionForm
          transaction={editingTransaction}
          onSuccess={closeForm}
        />
      )}
    </div>
  );
}
