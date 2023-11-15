"use client";

import "@/styles/globals.css";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import useTheme from "@/components/useTheme";
// export const metadata = {
//   title: "Friday Countdown",
//   description: "It's friday mutha fucka",
// };

export default function RootLayout({ children }) {
  const isLight = useTheme((state) => state.isLight);
  return (
    <html lang="en" className={isLight ? "" : "dark"}>
      <body className="bg-white dark:bg-gray-800 transition">
        <main className="flex flex-col h-screen container mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition">
          <Navigation />
          <div className="flex-grow bg-white dark:bg-gray-800 transition">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
