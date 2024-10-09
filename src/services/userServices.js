import axiosInstance from "@/services/axiosInstance";

export default {
  Register(payload) {
    return axiosInstance.post("/register", payload);
  },

  Login(payload) {
    return axiosInstance.post("/login", payload);
  },

  getUser() {
    return axiosInstance.get("/user/me");
  },

  getTransactions() {
    return axiosInstance.get("/transactions");
  },

  addTransaction(payload) {
    return axiosInstance.post("/transaction", payload);
  },

  updateTransaction(id, payload) {
    return axiosInstance.put(`/transaction/${id}`, payload);
  },
};
