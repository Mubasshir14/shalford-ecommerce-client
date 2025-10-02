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
import { Eye, EyeOff } from "lucide-react";
import { JSX } from "react/jsx-runtime";

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
    <div className="min-h-screen flex justify-center items-center font-arima bg-gray-50 mt-20">
      <div className="border-2 border-gray-200 shadow-lg rounded-2xl max-w-md w-full p-6 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-500">
            Create Your Account and Start Your Journey
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

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={
                isSubmitting ||
                !!(passwordConfirm && password !== passwordConfirm)
              }
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 text-blue-500 underline hover:text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
