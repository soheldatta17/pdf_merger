import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF Merger - Combine PDFs Easily",
  description: "A beautiful and easy-to-use tool for merging PDF files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
