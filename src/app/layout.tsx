import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Header } from "@/app/shared/layout/header";
import { Footer } from "@/app/shared/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/app/theme-provider";

export const metadata: Metadata = {
  title: "Three Goals",
  description: "A simple goal tracking app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-col min-h-svh justify-between">
          <Header />
          <main className="grow">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
