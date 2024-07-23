import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/providers/themeProvider";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { AuthenProvider } from "@/providers/AuthenProvider"
import {UINextProvider} from "@/providers/UINextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex items-center justify-center">

      
        <UINextProvider>
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
          </UINextProvider>
          </div>
      </body>
    </html>
  );
}
