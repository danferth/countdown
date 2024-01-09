import "@/styles/globals.css";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
// import useTheme from "@/components/useTheme";
// export const metadata = {
//   title: "Friday Countdown",
//   description: "It's friday mutha fucka",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-white  transition">
        <main className="flex flex-col min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 bg-white  transition">
          {/* <Navigation /> */}
          <div className="grow flex bg-white  transition">{children}</div>
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  );
}
