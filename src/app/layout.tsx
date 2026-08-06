import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { personalInfo, summary } from "@/data/profile";

const siteTitle = `${personalInfo.name} — ${personalInfo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-truongtsus-projects.vercel.app"),
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
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
