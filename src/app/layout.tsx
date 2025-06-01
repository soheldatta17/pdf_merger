import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import Chatbot from "@/components/Chatbot";

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <AuthModal />
        <Chatbot />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#374151',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
