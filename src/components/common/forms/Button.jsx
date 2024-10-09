import { Button } from "@headlessui/react";

export default function CustomButton({
  type = "button",
  onClick,
  children,
  disabled = false,
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 font-bold text-white bg-primary hover:bg-primary-dark rounded 
      ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } focus:outline-none`}
    >
      {children}
    </Button>
  );
}
