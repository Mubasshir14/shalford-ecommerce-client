import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Sansita, Lobster, Arima, Oleo_Script } from "next/font/google";
import Providers from "@/components/lib/providers/Providers";

const sansita = Sansita({
  variable: "--font-sansita",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

const oleo_script = Oleo_Script({
  variable: "--font-oleo_script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Shalford & Co. - Premium Ecommerce Store",
  description:
    "Shalford & Co. offers high-quality products for everyday needs. Explore our collection of fashion, electronics, home essentials, and more.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Shalford & Co.",
    "Ecommerce",
    "Online Shopping",
    "Fashion",
    "Electronics",
    "Home Essentials",
    "Premium Products",
    "Buy Online",
    "Shop Online",
  ],
  authors: [{ name: "Shalford & Co.", url: "https://www.shalfordco.com" }],
  creator: "Shalford & Co.",
  publisher: "Shalford & Co.",
  metadataBase: new URL("https://www.shalfordco.com"),
  applicationName: "Shalford & Co.",
  colorScheme: "light",
  themeColor: "#FFC107", // Amber-ish
  openGraph: {
    type: "website",
    title: "Shalford & Co. - Premium Ecommerce Store",
    description:
      "Discover exceptional products and shop online at Shalford & Co.",
    url: "https://www.shalfordco.com",
    siteName: "Shalford & Co.",
    images: [
      {
        url: "https://i.ibb.co.com/6JqvBf2D/company.png",
        width: 1200,
        height: 630,
        alt: "Shalford & Co. Online Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalford & Co. - Premium Ecommerce Store",
    description: "Shop high-quality products online at Shalford & Co.",
    creator: "@ShalfordCo",
    images: ["https://i.ibb.co.com/6JqvBf2D/company.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansita.variable} ${arima.variable} ${oleo_script.variable} ${lobster.variable} antialiased bg-gradient-to-br from-amber-50/40 via-orange-50/40 to-yellow-50`}
      >
        <Providers>
          <Toaster richColors position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
