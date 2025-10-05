/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/components/Services";
import { useState } from "react";
import { Eye, EyeOff, Lock, ShoppingBag } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import logo from "../../../assets/sk2.png";
import Image from "next/image";

// Validation schemas
const allowedDomains = ["gmail.com", "yahoo.com"];
const blockedDomains = [
  "spam.com",
  "temp.com",
  "tempmail.com",
  "10minutemail.com",
];

const emailSchema = z
  .string()
  .email("Invalid email format")
  .refine(
    (email) => {
      const domain = email.split("@")[1];
      return allowedDomains.includes(domain.toLowerCase());
    },
    { message: "Only Gmail or Yahoo emails are allowed" }
  )
  .refine(
    (email) => {
      const domain = email.split("@")[1];
      return !blockedDomains.includes(domain.toLowerCase());
    },
    { message: "Disposable or blocked email domains are not allowed" }
  );

const phoneSchema = z
  .string()
  .regex(
    /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
    "Invalid Bangladeshi phone number"
  );

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    phone: phoneSchema,
    address: z.string().min(1, "Address is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const router = useRouter();
  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const res = await registerUser(data);

      if (res?.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  const fields: Array<keyof RegisterFormValues> = [
    "name",
    "email",
    "phone",
    "address",
    "password",
    "passwordConfirm",
  ];

  const fieldIcons: Record<string, JSX.Element> = {
    name: <span>👤</span>,
    email: <span>📧</span>,
    phone: <span>📱</span>,
    address: <span>🏠</span>,
    password: <span>🔒</span>,
    passwordConfirm: <span>🔒</span>,
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-arima bg-gradient-to-br from-amber-50 via-white to-orange-50 mt-20">
      <div className="border-2 border-gray-200 shadow-lg rounded-2xl max-w-md w-full p-6 bg-white">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full mb-3 shadow-md">
            <Image
              src={logo}
              alt="Company Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-amber-800 mb-1 tracking-wide">
            Sign Up
          </h1>

          <p className="text-xs text-gray-400 text-center max-w-xs">
            Create your account and start your journey with us today.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {fieldName.replace(/([A-Z])/g, " $1")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1.5 text-gray-400">
                          {fieldIcons[fieldName]}
                        </span>

                        {fieldName === "password" ||
                        fieldName === "passwordConfirm" ? (
                          <>
                            <Input
                              type={
                                fieldName === "password"
                                  ? showPassword
                                    ? "text"
                                    : "password"
                                  : showConfirmPassword
                                  ? "text"
                                  : "password"
                              }
                              {...field}
                              value={field.value || ""}
                              className="pl-9 pr-10"
                            />
                            <span
                              className="absolute right-3 top-1.5 cursor-pointer text-gray-500"
                              onClick={() =>
                                fieldName === "password"
                                  ? setShowPassword((prev) => !prev)
                                  : setShowConfirmPassword((prev) => !prev)
                              }
                            >
                              {fieldName === "password" ? (
                                showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )
                              ) : showConfirmPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </span>
                          </>
                        ) : (
                          <Input
                            {...field}
                            value={field.value || ""}
                            className="pl-9"
                          />
                        )}
                      </div>
                    </FormControl>

                    {/* Show password mismatch message */}
                    {fieldName === "passwordConfirm" &&
                      passwordConfirm &&
                      password !== passwordConfirm && (
                        <FormMessage>❌ Passwords do not match</FormMessage>
                      )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing up...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Sign Up
                </span>
              )}
            </Button>
          </form>
        </Form>

        <div className="flex  items-center justify-center gap-1 mt-2">
          <p className="text-sm text-gray-600 ">Already have an account?</p>
          <Link
            href="/login"
            className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-6 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1 capitalize">
            <Lock className="w-3 h-3" />
            Secure login with encrypted connection
          </p>
        </div>
      </div>
    </div>
  );
}
