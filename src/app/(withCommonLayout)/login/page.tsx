import LoginPage from "@/components/Modules/Login/Login";
import React, { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense>
        <LoginPage />
      </Suspense>
    </div>
  );
}
