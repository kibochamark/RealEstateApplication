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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Nav />
          {children}
          <Footer/>
        </div>

      </body>
    </html>
  );
}
