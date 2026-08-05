import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { personalInfo, summary } from "@/data/profile";

const siteTitle = `${personalInfo.name} — ${personalInfo.title}`;

// ⚠️ Replace with the real production domain once deployed to Vercel (Q5).
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: siteTitle,
  description: summary,
  openGraph: {
    title: siteTitle,
    description: summary,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: summary,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
