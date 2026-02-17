import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderNew from "@/components/HeaderNew";
import FooterNew from "@/components/FooterNew";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Intelligent Systems | Capital Intelligence Group",
  description:
    "We integrate intelligent systems into businesses to streamline operations and increase efficiency. Systems That Think. Businesses That Scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grain-overlay" />
        <HeaderNew />
        <main className="min-h-screen">{children}</main>
        <FooterNew />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
