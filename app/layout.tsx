import type { Metadata } from "next";
import { Libre_Franklin, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATF | Aus Trade Fin - Commercial Loan Brokerage",
    template: "%s | ATF",
  },
  description:
    "Aus Trade Fin is a specialist commercial loan brokerage connecting Australian businesses with tailored funding solutions from institutional and non-bank lenders.",
  keywords: [
    "commercial loans",
    "loan brokerage",
    "business finance",
    "commercial lending",
    "Australia",
    "trade finance",
    "property finance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">
        <NextTopLoader
          color="#3B7DD8"
          height={2}
          showSpinner={false}
          easing="easeInOut"
          speed={300}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
