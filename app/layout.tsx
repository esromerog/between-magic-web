import type { Metadata } from "next";
import { Gamja_Flower, Fredoka } from "next/font/google";
import "./globals.css";

const bodyFont = Gamja_Flower({
  variable: "--font-body-custom",
  subsets: ["latin"],
  weight: "400",
});

// Figma uses "Fredoka One", which Google Fonts replaced with Fredoka.
// Weight 600 is the closest match.
const displayFont = Fredoka({
  variable: "--font-display-custom",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  title: "bommo",
  description: "Build and conquer this world",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="bommo"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}
