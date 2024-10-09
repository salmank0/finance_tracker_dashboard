"use client";
import Button from "@/components/common/forms/Button";
import Input from "@/components/common/forms/Input";
import Select from "@/components/common/forms/Select";
import { useState } from "react";
import { useUIContext } from "@/context/UIContext";
import userServices from "@/services/userServices";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "USER", // Default role
  });

  const { showLoader, hideLoader, showToast } = useUIContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && isNaN(value)) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    // Handle registration logic here
    console.log("Registering user", formData);
    try {
      const response = await userServices.Register(formData);
      console.log({ response });
      showToast("Registration successful!", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "USER",
      });
    } catch (error) {
      showToast("Registration failed. Please try again.", "error");
    } finally {
      hideLoader();
    }
  };

  const roles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-neutral-light dark:bg-neutral-dark rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            autoComplete="off"
          />
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
