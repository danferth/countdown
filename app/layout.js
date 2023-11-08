import "@/styles/globals.css";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export const metadata = {
  title: "Friday Countdown",
  description: "It's friday mutha fucka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col min-h-screen max-h-screen">
          <Navigation />
          <div className="flex-grow flex flex-col items-center justify-evenly md:justify-center lg:flex-row lg:px-20 min-w-full z-10 bg-white dark:bg-gray-800 transition">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
