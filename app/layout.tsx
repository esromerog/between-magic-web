import type { Metadata } from "next";
import { Imprima, Coiny } from "next/font/google";
import "./globals.css";

const imprimaFont = Imprima({
  variable: "--font-body-custom",
  subsets: ["latin"],
  weight: "400",
});

const coinyFont = Coiny({
  variable: "--font-display-custom",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "between magic",
  description: "Order a drink, create a character, and fight in this world",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="retro"
      className={`${imprimaFont.variable} ${coinyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
