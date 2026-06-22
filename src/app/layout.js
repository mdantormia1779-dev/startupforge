"use client"; 

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer/Footer";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // পাথ চেক করুন
  const isFounderRoute = pathname.startsWith("/founder");
  const isCollaboratorRoute = pathname.startsWith("/collaborator"); // "/" স্লাশ যোগ করা হয়েছে
  const isAdminRoute = pathname.startsWith("/admin"); // "/" স্লাশ যোগ করা হয়েছে

  // Navbar/Footer দেখাবে শুধুমাত্র যদি রুটটি founder বা collaborator না হয়
  const showSharedLayout = !isFounderRoute && !isCollaboratorRoute && !isAdminRoute;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* লজিক ঠিক করা হয়েছে */}
          {showSharedLayout && <Navbar />}

          <main className="grow">{children}</main>
          <ToastContainer />
          
          {showSharedLayout && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}