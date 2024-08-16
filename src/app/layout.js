import "./globals.css";
import MyNavbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { AuthenProvider } from "@/providers/AuthenProvider"
import {UINextProvider} from "@/providers/UINextProvider";
import {MapProvider} from "@/providers/MapProvider"
import NextUIThemeProvider from "@/providers/NextUIThemeProvider";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <UINextProvider>
          <AuthenProvider>
            <ThemeContextProvider>
                <NextUIThemeProvider >
                <MapProvider>
                  <div className="wrapper w-[90vw]">
                    <MyNavbar />
                    {children}
                    <Footer />
                </div>
                </MapProvider>
              </NextUIThemeProvider>
            </ThemeContextProvider>
          </AuthenProvider>
          </UINextProvider>
          <Analytics />
      </body>
    </html>
  );
}
