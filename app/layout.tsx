import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renuds",
  description: "RAG over the AI/ML research & deployment canon — answers technical AI questions with grounded, cited responses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
