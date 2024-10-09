import { useState } from "react";
import CustomInput from "@/components/common/forms/Input";
import CustomButton from "@/components/common/forms/Button";
import Select from "@/components/common/forms/Select";
import { useUIContext } from "@/context/UIContext";
import transactionServices from "@/services/transactionServices";

export default function TransactionForm({ transaction, onSuccess }) {
  const [formData, setFormData] = useState({
    type: transaction?.type || "INCOME",
    amount: transaction?.amount || "",
  });
  const { showLoader, hideLoader, showToast } = useUIContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    try {
      if (transaction) {
        await transactionServices.updateTransaction(transaction.id, formData); // Update transaction
        showToast("Transaction updated successfully!", "success");
      } else {
        await transactionServices.addTransaction(formData); // Add new transaction
        showToast("Transaction added successfully!", "success");
      }
      onSuccess();
    } catch (error) {
      showToast("Failed to process transaction", "error");
    } finally {
      hideLoader();
    }
  };

  const types = [
    { value: "INCOME", label: "Income" },
    { value: "EXPENSE", label: "Expense" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Type"
            options={types}
            selectedOption={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
          />
          <CustomInput
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="Transaction Amount"
          />
          <div className="flex justify-between">
            <CustomButton type="submit">
              {transaction ? "Update" : "Add"} Transaction
            </CustomButton>
            <button
              type="button"
              onClick={onSuccess}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
