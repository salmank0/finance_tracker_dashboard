"use client";
import { useState } from "react";
import CustomInput from "@/components/common/forms/Input";
import CustomButton from "@/components/common/forms/Button";
import { useUIContext } from "@/context/UIContext";
import userServices from "@/services/userServices";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { showLoader, hideLoader, showToast } = useUIContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    try {
      const response = await userServices.Login(formData);
      showToast("Login successful!", "success");

      console.log({ response });

      // Here you can redirect the user to the dashboard or handle the JWT token
      // For example: store the token in localStorage or Context
      const { token } = response.data.data;
      console.log({ token });
      localStorage.setItem("authToken", token);

      // Redirect to dashboard (adjust the route as per your app)
      router.push("/dashboard");
    } catch (error) {
      showToast("Login failed. Please check your credentials.", "error");
    } finally {
      hideLoader();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-neutral-light dark:bg-neutral-dark rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <CustomButton type="submit">Login</CustomButton>
        </form>
      </div>
    </div>
  );
}
