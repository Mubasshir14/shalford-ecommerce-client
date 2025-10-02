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

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginUser } from "@/components/Services";
import { useUser } from "@/components/context/UserContext";

const LoginPage = () => {
  const form = useForm();
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <Suspense>
        <div className="min-h-screen flex justify-center items-center font-arima">
          <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 mb-4">
              {/* <Image src={Logo} alt="logo" className="w-32" /> */}
              <div>
                <h1 className="text-xl font-semibold">Sign In</h1>
                <p className="font-extralight text-sm text-gray-600">
                  Please sign in to continue to your account
                </p>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1.5 text-gray-400">
                            📧
                          </span>
                          <Input
                            type="email"
                            {...field}
                            value={field.value || ""}
                            className="pl-9 mb-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1.5 text-gray-400">
                            🔒
                          </span>
                          <Input
                            type="password"
                            {...field}
                            value={field.value || ""}
                            className="pl-9"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-5 w-full cursor-pointer">
                  {isSubmitting ? "Logging...." : "Login"}
                </Button>
              </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
              Do not have any account?{" "}
              <Link
                href="/register"
                className="text-blue-400 underline font-semibold hover:text-blue-500 "
              >
                Register
              </Link>
            </p>
            <Link
              href="/forget-password"
              className="text-blue-400 underline font-semibold hover:text-blue-500 text-xs flex items-center justify-center"
            >
              Forget Password
            </Link>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default LoginPage;
