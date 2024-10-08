import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google"
import "./globals.css";

const grotesque = Bricolage_Grotesque({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "AI Curriculum Generator",
  description: "Introducing AI course curriculum generator. Unblock yourself. Get creative. Build faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesque.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
