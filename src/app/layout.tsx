// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter,Roboto_Slab } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./component/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });

const robotoslab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"], // Customize weights if needed
});
export const metadata: Metadata = {
  title: "zanfax",
  
  description: "zanfax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className},${robotoslab} `}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
