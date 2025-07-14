// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { NumerologyProvider } from "@/context/NumerologyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Numerohub - Your Pocket Numerology Powerhouse",
  description:
    "Precise daily, weekly, and monthly insights rooted in your unique numbers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-numerohub-bg text-numerohub-text`}
      >
        <NumerologyProvider>{children}</NumerologyProvider>
      </body>
    </html>
  );
}
