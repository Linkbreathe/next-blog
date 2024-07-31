import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/providers/themeProvider";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { AuthenProvider } from "@/providers/AuthenProvider"
import {UINextProvider} from "@/providers/UINextProvider";
import {MapProvider} from "@/providers/MapProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

const position = {lat: 48.932817, lng: 65.875769};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex items-center justify-center">

      
        <UINextProvider>
          <AuthenProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <MapProvider>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                    <Footer />
                  </div>
                </div>
                </MapProvider>
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthenProvider>
          </UINextProvider>
          </div>
      </body>
    </html>
  );
}
