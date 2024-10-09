import { useState, useEffect } from "react";

export default function Toast({ type = "success", message, isVisible }) {
  if (!isVisible) return null;

  const backgroundColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${backgroundColor} z-50`}
    >
      {message}
    </div>
  );
}
