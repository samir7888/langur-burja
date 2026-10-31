import './globals.css';
export const metadata = { title: 'Langur Burja', description: 'Play Langur Burja with friends in a room' };
export default function RootLayout({ children }) {
  return (<html lang="en"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Yatra+One&family=Nunito:wght@500;700;800&display=swap" />
  </head><body>{children}</body></html>);
}
