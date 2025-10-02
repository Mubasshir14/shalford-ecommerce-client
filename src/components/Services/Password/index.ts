export const forgetPassword = async (email: string, phone: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to send reset link");
  }

  return data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to reset password");
  }

  return data;
};
