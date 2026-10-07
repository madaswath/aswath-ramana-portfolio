import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const description =
  "Senior GenAI Engineer and Technical Lead with 7+ years of experience delivering scalable enterprise AI/ML solutions across banking, insurance, and financial services.";

export const metadata: Metadata = {
  title: "Aswath Ramana — Senior GenAI Engineer",
  description,
  authors: [{ name: "Aswath Ramana" }],
  creator: "Aswath Ramana",
  keywords: [
    "Aswath Ramana",
    "Senior GenAI Engineer",
    "Chennai",
    "RAG",
    "LangGraph",
    "LangChain",
    "Azure",
    "AWS",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aswath Ramana — Senior GenAI Engineer",
    description,
    type: "profile",
    locale: "en_IN",
    siteName: "Aswath Ramana",
  },
  twitter: {
    card: "summary",
    title: "Aswath Ramana — Senior GenAI Engineer",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
