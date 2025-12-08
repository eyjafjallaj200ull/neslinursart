import type { Metadata } from "next";
import { Grenze_Gotisch } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import { AuthProvider } from "./AuthProvider";
import Footer from "@/components/Footer";

const grenzeGotisch = Grenze_Gotisch({
  variable: "--font-grenze-gotisch",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neslinur's Art",
  description: "Portfolio of artist Nesli",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${grenzeGotisch.variable} ${grenzeGotisch.variable} antialiased font-[family-name:var(--font-grenze-gotisch)] has-[dialog[open]]:overflow-hidden`}
        >
          <Nav />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
