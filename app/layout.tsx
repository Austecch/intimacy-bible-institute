import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Intimacy Bible Institute | Transform Your Spiritual Journey",
  description:
    "Discover deep, intimate knowledge of God through our comprehensive biblical education programs. Join thousands of believers growing in faith and spiritual maturity.",
  keywords: ["Bible Institute", "Theology School", "Christian Education", "Spiritual Formation", "Online Bible College"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%237C3AED' rx='20' width='100' height='100'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'>I</text></svg>" />
      </head>
      <body className="min-h-screen bg-white dark:bg-stone-900">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
