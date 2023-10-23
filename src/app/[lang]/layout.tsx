import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/i18n-config";
import { cn } from "@utils";
import { Toaster } from "../../components/atoms/toaster";
import Navbar from "@components/molecules/navbar";
import { getDictionary } from "../get-dictionary";
import Footer from "@components/molecules/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prestige Parking",
  description: "Peer to peer parking",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
      >
        <div className="flex flex-col min-h-screen font-sans antialiased grainy px-4 md:px-6">
          <Navbar dictionary={dictionary.navbar} />
          <div className="flex-grow mt-20">{children}</div>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
