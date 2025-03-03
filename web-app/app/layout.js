import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({subsets: ["latin"]})
const fugaz = Fugaz_One({subsets: ["latin"], weight:['400']})

export const metadata = {
  title: "Blockhouse Crypto Tracker Logan Harmon",
  description: "Simple Crypto Tracker ",
};

export default function RootLayout({ children }) {
  
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>
        Blockhouse Crypto Tracker
      </h1>
    </header>
  )

  const footer = (
    <footer className="grid place-items-center">
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>
        Logan Harmon
      </h1>
    </footer>
  )
  
  return (
    <html lang="en">
      <AuthProvider>
        <body className=
        {'w-full max-w-[1200px] mx-auto text-sm sm:test-base min-h-screen flex flex-col ' + inter.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
