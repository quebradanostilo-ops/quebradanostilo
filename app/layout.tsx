import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quebrada no Stilo",
  description: "Moda streetwear e urbana — Quebrada no Stilo.",
  openGraph: {
    title: "Quebrada no Stilo",
    description: "Moda streetwear e urbana.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
