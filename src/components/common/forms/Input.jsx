import { Input } from "@headlessui/react";

export default function CustomInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange = () => {},
  error,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <Input
        {...props}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md bg-background text-foreground 
        ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 
        focus:ring-primary focus:border-primary`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
