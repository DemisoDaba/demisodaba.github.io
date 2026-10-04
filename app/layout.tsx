import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demiso Daba | Hydrology, Climate Science & AI",
  description:
    "Academic and research website of Demiso Daba, focusing on hydrology, climate science, remote sensing, artificial intelligence, and geospatial research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}