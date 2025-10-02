export type UserRole = "user" | "admin";

export interface IUser {
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  phone: string;
  address: string;
  image?: string;
  userId: string;
  clientInfo?: {
    device?: "pc" | "mobile";
    browser?: string;
    ipAddress?: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };

  lastLogin?: string;
  isActive?: boolean;
  otpToken?: string | null;

  createdAt?: string;
  updatedAt?: string;
}
