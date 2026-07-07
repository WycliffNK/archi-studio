import type { Metadata } from "next";
import { Antonio, Plus_Jakarta_Sans, Dancing_Script, Bebas_Neue } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ArchiStudio — Architecture & Interior Design",
  description: "Award-winning architecture firm creating spaces that inspire and endure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${antonio.variable} ${plusJakarta.variable} ${dancingScript.variable} ${bebasNeue.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#191919] text-white">
        {children}
      </body>
    </html>
  );
}
