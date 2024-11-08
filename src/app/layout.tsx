import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google"; // Import Google Font
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";


// Import the Lato font from Google Fonts
const lato = Nunito_Sans({
  weight: ["400", "700", "900"], // Adjust weights as needed
  subsets: ["latin"], // Specify subsets
});

export const metadata: Metadata = {
  title: "Intime Homes",
  description: "The better way to buy real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.className} antialiased min-h-screen`}
      >
        <div className="relative">
          <div className="top-0">
          <Nav />
          </div>
          {children}
          <Footer/>
        </div>

      </body>
    </html>
  );
}
