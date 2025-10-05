/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import logo from '../../../assets/sk2.png'
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import { loginUser } from "@/components/Services";
// import { useUser } from "@/components/context/UserContext";
// import Image from "next/image";

// const LoginPage = () => {
//   const form = useForm();
//   const { setIsLoading } = useUser();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirectPath");
//   const router = useRouter();

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       const res = await loginUser(data);
//       setIsLoading(true);
//       if (res?.success) {
//         toast.success(res?.message);
//         if (redirect) {
//           router.push(redirect);
//         } else {
//           router.push("/");
//         }
//       } else {
//         toast.error(res?.message);
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Suspense>
//         <div className="min-h-screen flex justify-center items-center font-arima">
//           <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
//             <div className="flex items-center space-x-4 mb-4">
//               <Image src={logo} alt="logo" className="w-32" />
//               <div>
//                 <h1 className="text-xl font-semibold">Sign In</h1>
//                 <p className="font-extralight text-sm text-gray-600">
//                   Please sign in to continue to your account
//                 </p>
//               </div>
//             </div>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1.5 text-gray-400">
//                             📧
//                           </span>
//                           <Input
//                             type="email"
//                             {...field}
//                             value={field.value || ""}
//                             className="pl-9 mb-2"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1.5 text-gray-400">
//                             🔒
//                           </span>
//                           <Input
//                             type="password"
//                             {...field}
//                             value={field.value || ""}
//                             className="pl-9"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button type="submit" className="mt-5 w-full cursor-pointer bg-amber-700">
//                   {isSubmitting ? "Logging...." : "Login"}
//                 </Button>
//               </form>
//             </Form>
//             <p className="text-sm text-gray-600 text-center my-3">
//               Do not have any account?{" "}
//               <Link
//                 href="/register"
//                 className="text-blue-400 underline font-semibold hover:text-blue-500 "
//               >
//                 Register
//               </Link>
//             </p>
//             <Link
//               href="/forget-password"
//               className="text-blue-400 underline font-semibold hover:text-blue-500 text-xs flex items-center justify-center"
//             >
//               Forget Password
//             </Link>
//           </div>
//         </div>
//       </Suspense>
//     </>
//   );
// };

// export default LoginPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from '../../../assets/sk2.png';
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { loginUser } from "@/components/Services";
import { useUser } from "@/components/context/UserContext";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from "lucide-react";

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validation
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginUser(data);
      
      if (res?.success) {
        toast.success(res?.message || "Login successful!");
        
        // Small delay for better UX
        setTimeout(() => {
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/");
          }
        }, 500);
      } else {
        toast.error(res?.message || "Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex justify-center items-center font-arima p-4 mt-10">
        <div className="bg-white shadow-2xl rounded-2xl flex-grow max-w-md w-full p-8 border border-gray-100">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mb-2">
              <Image src={logo} alt="logo" className="w-24 h-auto" />
            </div>
            <h1 className="text-2xl font-bold text-amber-800 mb-1">Welcome Back!</h1>
            <p className="text-xs text-gray-500 text-center">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          value={field.value || ""}
                          className="pl-11 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-bold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          value={field.value || ""}
                          className="pl-11 pr-11 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Forget Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/forget-password"
                  className="text-sm text-amber-600 hover:text-amber-700 font-bold transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to our store?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-6 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1 capitalize">
              <Lock className="w-3 h-3" />
              Secure login with encrypted connection
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;