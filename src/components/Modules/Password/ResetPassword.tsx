/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { resetPassword } from "@/components/Services/Password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const params = useParams();
  const token = params?.token;
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || Array.isArray(token)) {
      toast.error("Invalid reset link");
      return;
    }

    try {
      const res = await resetPassword(token, newPassword);
      if (res?.success) {
        toast.success(
          res.message || "Password Reset Successfully! Login Again"
        );
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to Reset!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sansita">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 mb-1">
              New Password 🔒
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 pr-10 focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Icon inside input */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
