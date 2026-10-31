import "./globals.css";
import { FAQ } from "./landing";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1d4d",
  colorScheme: "dark",
};

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#c92a2a" }],
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#0e3b38",
    "msapplication-TileImage": "/mstile-150x150.png",
    "msapplication-config": "/browserconfig.xml",
  },
  title: {
    default:
      "Langur Burja Online – Play with Friends | लङ्गुर बुर्जा खेल्नुहोस्",
    template: "%s | Langur Burja",
  },
  description:
    "Play Langur Burja (लङ्गुर बुर्जा) online with friends. Host a room, share the code on WhatsApp or Viber and roll the dice together in real time. Free Nepali Dashain & Tihar dice game, made for mobile.",
  keywords:
    "play langur burja with friends, langur burja online, multiplayer langur burja, langur burja room code, लङ्गुर बुर्जा, लङ्गुर बुर्जा अनलाइन, साथीहरूसँग लङ्गुर बुर्जा, jhanda burja, jhandi munda online, khor khore, nepali dice game with friends, dashain game online, tihar game online, crown and anchor online, free nepali game, nepali mobile game",
  authors: [{ name: "Langur Burja Game" }],
  creator: "Langur Burja",
  publisher: "Langur Burja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Langur Burja Online – Play with Friends | लङ्गुर बुर्जा",
    description:
      "Host a room, share the code and play traditional Nepali Langur Burja (लङ्गुर बुर्जा) with your friends online, in real time. Free, no signup, made for mobile.",
    url: "/",
    siteName: "Langur Burja Online",
    locale: "ne_NP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Langur Burja - Traditional Nepali Dice Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Langur Burja Online - लङ्गुर बुर्जा",
    description:
      "Host a room, invite friends and play Langur Burja online together. Free Nepali dice game!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ne">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Yatra+One&family=Nunito:wght@500;700;800&display=swap"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Langur Burja" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Nepal" />
        <meta name="language" content="Nepali" />
        <link rel="alternate" hrefLang="ne" href="/" />
        <link rel="alternate" hrefLang="en" href="/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": ["Game", "WebApplication"],
                name: "Langur Burja Online",
                alternateName: ["लङ्गुर बुर्जा", "Jhanda Burja", "Jhandi Munda", "Khor Khore"],
                description:
                  "Play Langur Burja online with friends. Host a room, share the room code and roll six symbol dice together in real time. A traditional Nepali Dashain and Tihar dice game.",
                url: "/",
                inLanguage: ["ne", "en"],
                gamePlatform: "Web Browser",
                applicationCategory: "GameApplication",
                operatingSystem: "Any (mobile and desktop browsers)",
                playMode: "MultiPlayer",
                numberOfPlayers: { "@type": "QuantitativeValue", minValue: 2 },
                genre: ["Dice Game", "Traditional Game", "Multiplayer Game"],
                isAccessibleForFree: true,
                offers: { "@type": "Offer", price: "0", priceCurrency: "NPR" },
                author: { "@type": "Organization", name: "Langur Burja Online" },
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: "How to play Langur Burja online with friends",
                step: [
                  { "@type": "HowToStep", name: "Host a room", text: "Enter your name and tap Host a new room. You become the banker." },
                  { "@type": "HowToStep", name: "Invite your friends", text: "Share the room code or invite link on WhatsApp, Viber or Messenger." },
                  { "@type": "HowToStep", name: "Bet and roll together", text: "Everyone places bets on symbols from their own phone, then the host rolls the six dice." },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
