import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ibmplexsans",
});

// const inter = Inter({
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Discover your local coffee shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${ibmPlexSans.variable} ${inter.variable}`}> */}
      <body className={ibmPlexSans.className}>{children}</body>
    </html>
  );
}
