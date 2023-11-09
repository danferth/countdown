import "@/styles/globals.css";
import Footer from "../components/Footer";
import ThemeSetter from "../components/ThemeSetter";
import Navigation from "../components/Navigation";
export const metadata = {
  title: "Friday Countdown",
  description: "It's friday mutha fucka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-800 transition">
        <main className="flex flex-col h-screen container mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition">
          <Navigation />
          <ThemeSetter />
          <div className="flex-grow bg-white dark:bg-gray-800 transition">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
