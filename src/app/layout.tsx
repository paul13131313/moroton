import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_JP, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "あんたなんぼなん？ — AI年収査定",
  description:
    "関西のオバちゃんAIがチャット形式であんたの適正年収を査定するで。偏差値・世界/国内/業界ランク（S〜D）まで出るわ。",
  metadataBase: new URL("https://moroton.vercel.app"),
  openGraph: {
    title: "あんたなんぼなん？ — AI年収査定",
    description: "関西のオバちゃんAIが適正年収を査定するで",
    url: "https://moroton.vercel.app",
    siteName: "あんたなんぼなん？",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "あんたなんぼなん？ — AI年収査定",
    description: "関西のオバちゃんAIが適正年収を査定するで",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A1919" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${notoSansJP.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
