import "@/styles/globals.css";
import { Chivo_Mono, Work_Sans, Edu_SA_Beginner } from "next/font/google";
import Navigation from "../components/Navigation";
// import useTheme from "@/components/useTheme";
// export const metadata = {
//   title: "Friday Countdown",
//   description: "It's friday mutha fucka",
// };

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const eduSaBeginner = Edu_SA_Beginner({
  subsets: ["latin"],
  variable: "--font-Edu-SA-Beginner",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${chivoMono.variable} ${workSans.variable} ${eduSaBeginner.variable} dark h-full`}
    >
      <body className="bg-base-100 h-full transition">
        <main
          className={
            "container mx-auto bg-base-100 transition h-full flex flex-col"
          }
        >
          {/* <Navigation /> */}
          <div className="grow flex transition">{children}</div>
        </main>
      </body>
    </html>
  );
}
