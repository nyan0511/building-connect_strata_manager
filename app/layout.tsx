import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunrise Strata Apartments - Building Management",
  description: "Official website for Sunrise Strata Apartments - Access facilities, meeting minutes, announcements, and building information for residents and committee members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navigation />
        <main>
          {children}
        </main>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sunrise Strata Apartments</h3>
                <p className="text-gray-300 text-sm">
                  Professional strata management for modern living in the heart of Sydney.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>123 Harbor View Drive</p>
                  <p>Sydney NSW 2000</p>
                  <p>Phone: (02) 9123-4567</p>
                  <p>Email: committee@sunrisestrata.com.au</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>Emergency: 1800-EMERGENCY</p>
                  <p>Maintenance: 1300-FIX-NOW</p>
                  <p>Building Security: (02) 9123-4568</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 Sunrise Strata Apartments. All rights reserved. | Built for INFO1111 Assignment</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
