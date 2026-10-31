import "./globals.css";

export const metadata = {
  title:
    "Langur Burja Online - लङ्गुर बुर्जा खेल्नुहोस् | Play Free Nepali Dice Game",
  description:
    "Play Langur Burja (लङ्गुर बुर्जा) online for free. Traditional Nepali dice game with friends. झण्डा, बुर्जा, पान, हुकुम, इँटा, चिडी. Popular in Nepal, India, Bangladesh. Play now!",
  keywords:
    "langur burja, लङ्गुर बुर्जा, nepali game, nepali dice game, jhanda burja, crown and anchor, langur game online, langur burja online, traditional nepali game, dashain game, tihar game, nepal card game, indian dice game, langur burja khelne, online nepali game, free nepali game, multiplayer nepali game, लङ्गुर बुर्जा अनलाइन, झण्डा बुर्जा",
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
    title: "Langur Burja Online - लङ्गुर बुर्जा | Free Nepali Dice Game",
    description:
      "Play traditional Langur Burja (लङ्गुर बुर्जा) online with friends. Popular Nepali dice game with 6 symbols - झण्डा, बुर्जा, पान, हुकुम, इँटा, चिडी. Free multiplayer game!",
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
      "Play traditional Nepali dice game Langur Burja online with friends for free!",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Yatra+One&family=Nunito:wght@500;700;800&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c92a2a" />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Game",
              name: "Langur Burja",
              alternateName: "लङ्गुर बुर्जा",
              description:
                "Traditional Nepali dice game with six symbols - झण्डा (Flag), बुर्जा (Crown), पान (Heart), हुकुम (Spade), इँटा (Diamond), चिडी (Club)",
              gameItem: "Dice",
              numberOfPlayers: "2+",
              url: "/",
              inLanguage: ["ne", "en"],
              gamePlatform: "Web Browser",
              genre: ["Dice Game", "Traditional Game", "Gambling Game"],
              author: {
                "@type": "Organization",
                name: "Langur Burja Online",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Langur Burja?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Langur Burja (लङ्गुर बुर्जा) is a traditional Nepali dice game played with 6 dice featuring unique symbols: झण्डा (Flag), बुर्जा (Crown), पान (Heart), हुकुम (Spade), इँटा (Diamond), and चिडी (Club). It's popular during Dashain and Tihar festivals.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you play Langur Burja online?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "To play Langur Burja online, one player hosts a room and shares the room code with friends. Players join using the code, place bets on symbols, and the host rolls the dice. If your symbol appears on 2 or more dice, you win!",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Langur Burja free to play?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Our online Langur Burja game is completely free to play. No registration, no downloads, and no hidden costs. Just create a room and start playing with friends.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
