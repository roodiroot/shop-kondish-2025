import { Suspense } from "react";
import type { Metadata } from "next";

import Footer from "@/components/general/footer/footer";
import Navbar from "@/components/general/navbar/navbar";
import TanstackProvider from "@/providers/tanstack-provider";
import CookieBanner from "@/components/general/cookie-banner";
import OverlaySection from "@/components/general/overlay-section";
import GeneralToaster from "@/components/general/toaster/general-toaster";

import { Lato } from "next/font/google";
import { AuthProvider } from "@/context/authcontext";
import { MetrikaTracker } from "../components/metrika-tracker/metrika-tracker";

import "./globals.css";
import "@smastrom/react-rating/style.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kondish.su"),
  title: {
    template: "%s | Kóndish установка и продажа кондиционеров.",
    default: "Kóndish установка кондиционеров в Москве и Московской области.",
  },
  description:
    "Установка и подбор кондиционеров и сплит-систем. | Более 15 лет устанавливаем климатическую технику в ваших домах.",
  icons: "/kondish.svg",
  openGraph: {
    title: "Kóndish установка и продажа кондиционеров в Москве.",
    description:
      "Установка и подбор кондиционеров и сплит-систем. | Более 15 лет устанавливаем климатическую технику в ваших домах.",
    siteName: "Kóndish",
    type: "website",
    locale: "ru_RU",
    url: "https://kondish.su",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/Frame_23_81477b6c9e.jpg`,
        width: 1200,
        height: 630,
        alt: "Kóndish установка и продажа кондиционеров в Москве.",
      },
    ],
  },
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "300", "900", "700"], // Укажи нужные веса
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TanstackProvider>
        <html lang="ru">
          <head>
            {/* Подключение скриптов */}
            {/* <Script
              src="https://lidrekon.ru/slep/js/jquery.js"
              strategy="beforeInteractive"
            />
            <Script
              src="https://lidrekon.ru/slep/js/uhpv-full.min.js"
              strategy="afterInteractive"
            /> */}
          </head>
          <body
            className={`${lato.className} antialiased min-h-screen flex flex-col`}
          >
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />
            <OverlaySection />
            <GeneralToaster />
            <CookieBanner />
            <Suspense>
              <MetrikaTracker />
            </Suspense>
          </body>
        </html>
      </TanstackProvider>
    </AuthProvider>
  );
}
