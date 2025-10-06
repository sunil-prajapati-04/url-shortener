import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isSigningIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4">
      {/* Card */}
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="mt-1 w-full"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="pr-10 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSigningIn}
            className="w-full py-2 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="size-5 animate-spin mr-2 inline" />
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => (window.location.href = "/signup")}
            className="text-indigo-600 hover:underline cursor-pointer dark:text-indigo-400"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
