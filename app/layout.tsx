import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/authcontext";
import Navbar from "@/components/general/navbar/navbar";
import { SheetSide } from "@/components/general/auth/sheet";
import TanstackProvider from "@/providers/tanstack-provider";

import "./globals.css";
import Footer from "@/components/general/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kondish.su"),
  title: {
    template: "%s | Kóndish установка и продажа кондиционеров в Москве.",
    default: "Kóndish установка кондиционеров в Москве и Московской области.",
  },
  description:
    "Установка и подбор кондиционеров и сплит-систем в Москве и Московской области. | Более 12 лет устанавливаем климатическую технику в ваших домах.",
  icons: "/kondish.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TanstackProvider>
        <html lang="ru">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          >
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />
            <SheetSide />
            <Toaster />
          </body>
        </html>
      </TanstackProvider>
    </AuthProvider>
  );
}
