/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { forgetPassword } from "@/components/Services/Password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgetPassword(email, phone);
      if (res?.success) {
        toast.success(res.message || "Reset Link Sent To Your Email");
        setTimeout(() => {
        router.push("/login");
      }, 500);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sent reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  font-sansita">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Forget Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white py-2 px-4 rounded"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
