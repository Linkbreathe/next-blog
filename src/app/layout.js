import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/themeProvider";
import { AuthenProvider } from "@/providers/AuthenProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthenProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                    <Footer />
                  </div>
                </div>
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthenProvider>
      </body>
    </html>
  );
}
