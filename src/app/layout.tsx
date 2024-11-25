import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google"; // Import Google Font
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/providers/auth-provider";


// Import the Lato font from Google Fonts
const lato = Jost({
  weight: ["400", "700", "900"], // Adjust weights as needed
  subsets: ["latin"], // Specify subsets
});

export const metadata: Metadata = {
  title: "Home - Intime Homes",
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
          <AuthProvider>
            <div className="top-0">
              <Nav />
            </div>
            {children}
            <Footer />
          </AuthProvider>
        </div>

      </body>
    </html>
  );
}
