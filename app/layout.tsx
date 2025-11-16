import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat-alternates',
});

export const metadata: Metadata = {
  title: "PokéDex - Explore Pokemon",
  description: "Browse and manage your favorite Pokemon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={montserratAlternates.className}>
        <Providers>{children}</Providers>
        <div className="fixed bottom-0 left-0 w-full h-[18vh] backdrop-blur-md bg-gradient-to-t from-white/40 to-transparent z-50 pointer-events-none"></div>
      </body>
    </html>
  );
}
