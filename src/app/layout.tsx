import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Sansita, Lobster, Arima, Oleo_Script } from "next/font/google";
import Providers from "@/components/lib/providers/Providers";
import SupportIcon from "@/components/shared/Support/SupportIcon";
import GoogleTranslate from "@/components/shared/GoogleTranslate/GoogleTranslate";

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
  title: "MUNJIA FASHION - Premium Ecommerce Store",
  description:
    "MUNJIA FASHION offers high-quality products for everyday needs. Explore our collection of fashion, electronics, home essentials, and more.",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  keywords: [
    "MUNJIA FASHION",
    "Ecommerce",
    "Online Shopping",
    "Fashion",
    "Electronics",
    "Home Essentials",
    "Premium Products",
    "Buy Online",
    "Shop Online",
  ],
  authors: [{ name: "MUNJIA FASHION", url: "https://www.munjiafashion.com" }],
  creator: "MUNJIA FASHION",
  publisher: "MUNJIA FASHION",
  metadataBase: new URL("https://www.munjiafashion.com"),
  applicationName: "MUNJIA FASHION",
  colorScheme: "light",
  themeColor: "#FFC107", // Amber-ish
  openGraph: {
    type: "website",
    title: "MUNJIA FASHION - Premium Ecommerce Store",
    description:
      "Discover exceptional products and shop online at MUNJIA FASHION",
    url: "https://www.munjiafashion.com",
    siteName: "MUNJIA FASHION",
    images: [
      {
        url: "https://i.ibb.co.com/4Zbx7zjx/sk2.png",
        width: 1200,
        height: 630,
        alt: "MUNJIA FASHION Online Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUNJIA FASHION - Premium Ecommerce Store",
    description: "Shop high-quality products online at MUNJIA FASHION",
    creator: "@munjiafashion",
    images: ["https://i.ibb.co.com/4Zbx7zjx/sk2.png"],
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
           <GoogleTranslate />
          <Toaster richColors position="top-center" />
          {children}
          <SupportIcon />
        </Providers>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";
// import { Toaster } from "sonner";
// import { Sansita, Lobster, Arima, Oleo_Script } from "next/font/google";
// import Providers from "@/components/lib/providers/Providers";
// import SupportIcon from "@/components/shared/Support/SupportIcon";
// import GoogleTranslate from "@/components/shared/GoogleTranslate/GoogleTranslate";
// import { Squares } from "@/components/ui/squares-background";

// const sansita = Sansita({
//   variable: "--font-sansita",
//   subsets: ["latin"],
//   weight: ["400", "700", "800", "900"],
// });

// const arima = Arima({
//   variable: "--font-arima",
//   subsets: ["latin"],
// });

// const oleo_script = Oleo_Script({
//   variable: "--font-oleo_script",
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

// const lobster = Lobster({
//   variable: "--font-lobster",
//   subsets: ["latin"],
//   weight: ["400"],
// });

// export const metadata: Metadata = {
//   title: "MUNJIA FASHION - Premium Ecommerce Store",
//   description:
//     "MUNJIA FASHION offers high-quality products for everyday needs. Explore our collection of fashion, electronics, home essentials, and more.",
//   icons: {
//     icon: "/fav.png",
//     apple: "/fav.png",
//   },
//   keywords: [
//     "MUNJIA FASHION",
//     "Ecommerce",
//     "Online Shopping",
//     "Fashion",
//     "Electronics",
//     "Home Essentials",
//     "Premium Products",
//     "Buy Online",
//     "Shop Online",
//   ],
//   authors: [{ name: "MUNJIA FASHION", url: "https://www.munjiafashion.com" }],
//   creator: "MUNJIA FASHION",
//   publisher: "MUNJIA FASHION",
//   metadataBase: new URL("https://www.munjiafashion.com"),
//   applicationName: "MUNJIA FASHION",
//   colorScheme: "light",
//   themeColor: "#FFC107", // Amber-ish
//   openGraph: {
//     type: "website",
//     title: "MUNJIA FASHION - Premium Ecommerce Store",
//     description:
//       "Discover exceptional products and shop online at MUNJIA FASHION",
//     url: "https://www.munjiafashion.com",
//     siteName: "MUNJIA FASHION",
//     images: [
//       {
//         url: "https://i.ibb.co.com/4Zbx7zjx/sk2.png",
//         width: 1200,
//         height: 630,
//         alt: "MUNJIA FASHION Online Store",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "MUNJIA FASHION - Premium Ecommerce Store",
//     description: "Shop high-quality products online at MUNJIA FASHION",
//     creator: "@munjiafashion",
//     images: ["https://i.ibb.co.com/4Zbx7zjx/sk2.png"],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${sansita.variable} ${arima.variable} ${oleo_script.variable} ${lobster.variable} antialiased bg-gradient-to-br from-amber-50/40 via-orange-50/40 to-yellow-50`}
//       >
//         <Providers>
//           <GoogleTranslate />
//           <div className="fixed inset-0 z-0">
//             <Squares
//               direction="diagonal"
//               speed={0.5}
//               borderColor="rgba(210, 180, 140, 0.2)"
//               squareSize={50}
//               hoverFillColor="rgba(139, 69, 19, 0.1)"
//             />
//           </div>
//           <div className="relative z-10">
//             <Toaster richColors position="top-center" />
//             {children}
//           </div>
//           <SupportIcon />
//         </Providers>
//       </body>
//     </html>
//   );
// }
