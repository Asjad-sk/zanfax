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
  icons:{
    icon:"https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36?v=1"
  }
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
