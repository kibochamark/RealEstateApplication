import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google"; // Import Google Font
import Nav from "@/components/layout/nav";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "react-hot-toast"
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Footer from "@/components/layout/enhancedfooter";


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
            <ReactQueryProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: '',
                  duration: 5000,

                }}
              />
              <div className="top-0">
                <Nav />
              </div>
              {children}
              <Footer />
            </ReactQueryProvider>
          </AuthProvider>
        </div>

      </body>
    </html>
  );
}
