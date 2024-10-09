"use client";
import { createContext, useState, useContext } from "react";
import Loader from "@/components/common/Loader";
import Toast from "@/components/common/Toast";

// Create context
const UIContext = createContext();

// Create provider component
export const UIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast({ ...toast, isVisible: false }), 3000); // Hide after 3 seconds
  };

  return (
    <UIContext.Provider
      value={{ isLoading, showLoader, hideLoader, toast, showToast }}
    >
      {children}
      {/* Global Components */}
      <Loader isLoading={isLoading} />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
      />
    </UIContext.Provider>
  );
};

// Custom hook to use the UIContext
export const useUIContext = () => useContext(UIContext);
