// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { NumerologyProvider } from "@/context/NumerologyContext";
import { UserProvider } from "@/context/UserContext";
import UserBadge from "./components/UserBadge";

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
        <UserProvider>
          <UserBadge />
            <NumerologyProvider>{children}</NumerologyProvider>
          {/* </UserBadge> */}
        </UserProvider>
      </body>
    </html>
  );
}
