import { Outfit } from "next/font/google";
import BottomNav from "./components/BottomNav";
import HeaderNav from "./components/HeaderNav";
import PageShell from "./components/PageShell";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "iPlayMusic",
  description: "A music streaming app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased min-h-screen flex flex-col justify-between gap-2`}>
        <PageShell>
          <HeaderNav />
          {children}
          <BottomNav />
        </PageShell>
      </body>
    </html>
  );
}
