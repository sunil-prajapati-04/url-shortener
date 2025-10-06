import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signup, isSigningup } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
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
    if (success) {
      signup(formData, navigate);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="text-left">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Type your name"
              className="mt-1 w-full"
            />
          </div>

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
                placeholder="******"
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
            disabled={isSigningup}
            className="w-full py-2 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isSigningup ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline cursor-pointer dark:text-indigo-400"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
