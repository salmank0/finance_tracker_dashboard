import axiosInstance from "@/services/axiosInstance";

export default {
  getTransactions() {
    return axiosInstance.get("/transactions");
  },

  addTransaction(payload) {
    return axiosInstance.post("/transactions", payload);
  },

  updateTransaction(id, payload) {
    return axiosInstance.put(`/transactions/${id}`, payload);
  },

  deleteTransaction(id) {
    return axiosInstance.delete(`/transactions/${id}`);
  },
};
