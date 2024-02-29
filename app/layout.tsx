import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Room } from "./Room";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--global-font-family",
  weight: ["100", "300", "400", "500", "700", "900"],
});



export const metadata: Metadata = {
  title: "Figma Clone",
  description:
    "Trying my best to be a world class. by buiding with fabric.js and Liveblock",
    icons: {
      icon: '/icon.ico', // /public path
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${roboto.className} bg-slate-800 text-white`}>
        <Room>{children}</Room>
      </body>
    </html>
  );
}
