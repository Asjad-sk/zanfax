// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./component/ReduxProvider";
import Head from "next/head"; // Import Head to manage the document head

const inter = Inter({ subsets: ["latin"] });

const robotoslab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"], // Customize weights if needed
});

export const metadata: Metadata = {
  title: "Zanfax",
  description: "Welcome to the world of function",
  icons: {
    icon: "https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36?v=1",
    apple: "https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36?v=1", // Optional: For Apple devices

  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define structured data for organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zanfax",
    url: "https://www.zanfax.com",
    logo: "https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36?v=1",
    sameAs: [
      "https://www.instagram.com/yourprofile",
      "https://www.facebook.com/yourprofile",
      // Add other social media links if needed
    ]
  };

  return (
    <html lang="en">
      <Head>
        {/* Render structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
