// Server-safe presentational pieces: Nepal-themed background + visible SEO content.
export const FAQ = [
  {
    q: "What is Langur Burja?",
    a: "Langur Burja (लङ्गुर बुर्जा), also called Jhanda Burja, Khor Khore or Jhandi Munda, is a traditional Nepali dice game played at Dashain and Tihar. Six dice carry six symbols: Jhanda (flag), Burja (crown), Paan (heart), Hukum (spade), Itta (diamond) and Chidi (club).",
  },
  {
    q: "How do I play Langur Burja online with friends?",
    a: "One player hosts a room and becomes the banker. Share the 5-letter room code or invite link with your friends over WhatsApp, Viber or Messenger. Everyone joins from their own phone, places bets on symbols, and the host rolls the dice for the whole room in real time.",
  },
  {
    q: "Can I play with friends who live in another city or country?",
    a: "Yes. Rooms work over the internet, so friends in Kathmandu, Pokhara, the Gulf, Australia, the UK or the US can all play the same round together.",
  },
  {
    q: "Is it free? Do I need to sign up?",
    a: "It is completely free. No account, no download and no real money: everyone plays with virtual coins, starting with 1000.",
  },
  {
    q: "Does it work on mobile phones?",
    a: "Yes. The game is designed phone-first and runs in any modern mobile browser, so there is nothing to install.",
  },
];

const STEPS = [
  ["१", "Host a room", "Enter your name and tap Host. You become the banker and roll the dice."],
  ["२", "Invite your friends", "Share the room code or invite link on WhatsApp, Viber or Messenger."],
  ["३", "Bet and roll together", "Everyone bets from their own phone. Watch the dice roll live for the whole room."],
];
const SYMS = [
  ["झण्डा", "Jhanda", "Flag"],
  ["बुर्जा", "Burja", "Crown"],
  ["पान", "Paan", "Heart"],
  ["हुकुम", "Hukum", "Spade"],
  ["इँटा", "Itta", "Diamond"],
  ["चिडी", "Chidi", "Club"],
];

export function Info() {
  return (
    <div className="info">
      <section>
        <h2>Play Langur Burja with friends, anywhere</h2>
        <p>
          Remember playing Langur Burja on a mat with cousins after Tika?
          Bring that Dashain and Tihar feeling to your phone. Create a room,
          share the code, and play together in real time, whether your friends
          are across the street or across the world.
        </p>
        <ol className="steps">
          {STEPS.map(([n, t, d]) => (
            <li key={t}>
              <span className="n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>The six symbols · छ वटा चिन्ह</h2>
        <ul className="symgrid">
          {SYMS.map(([np, rm, en]) => (
            <li key={rm}>
              <b>{np}</b>
              <span>{rm} · {en}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>How to play</h2>
        <p>
          Everyone starts with 1000 virtual coins. Place bets on one or more
          symbols, then the host rolls six dice. If your symbol lands on two or
          more dice you win your stake back plus your stake for every matching
          die. If it lands on one die or none, the banker keeps your stake.
        </p>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        {FAQ.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <footer>
        Made with ❤️ in Nepal 🇳🇵 · Free multiplayer Langur Burja (लङ्गुर बुर्जा)
        online · Virtual coins only, no real money.
      </footer>
    </div>
  );
}

const FLOAT = ["♥", "♠", "♦", "♣", "♥", "♣", "♦", "♠"];

export function NepalBg({ dim }) {
  return (
    <div className={"nepal-bg" + (dim ? " dim" : "")} aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1d4d" />
            <stop offset=".5" stopColor="#4a1a45" />
            <stop offset=".82" stopColor="#c92a2a" />
            <stop offset="1" stopColor="#f5a623" />
          </linearGradient>
          <radialGradient id="sun">
            <stop offset="0" stopColor="#fff3b0" />
            <stop offset=".45" stopColor="#f5a623" />
            <stop offset="1" stopColor="#f5a62300" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)" />
        <g fill="#fff">
          {[[90,80],[210,150],[330,60],[470,120],[760,70],[880,140],[1010,60],[1120,130],[640,40],[540,190]].map(([x, y], i) => (
            <circle key={i} className="tw" cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} style={{ animationDelay: i * 0.45 + "s" }} />
          ))}
        </g>
        <circle className="sun" cx="600" cy="520" r="230" fill="url(#sun)" />
        <ellipse className="cloud" cx="250" cy="300" rx="120" ry="16" fill="#fff" opacity=".14" />
        <ellipse className="cloud c2" cx="900" cy="250" rx="150" ry="18" fill="#fff" opacity=".12" />
        <path fill="#4b4f93" d="M0 600 125 450 205 520 330 350 430 490 520 410 620 270 720 420 800 350 930 490 1030 400 1200 560V800H0Z" />
        <g fill="#f4f1ff" opacity=".92">
          <path d="M620 270 580 335 605 322 620 348 640 322 665 335Z" />
          <path d="M330 350 300 400 322 390 336 410 352 390 365 402Z" />
          <path d="M800 350 772 395 792 386 805 404 822 386 836 398Z" />
        </g>
        <path fill="#2a2d63" d="M0 640 140 560 260 620 400 540 540 625 700 550 840 630 980 560 1200 650V800H0Z" />
        <path fill="#0f3d36" d="M0 700Q200 640 400 692T800 682T1200 655V800H0Z" />
        <g transform="translate(300 690) scale(1.5)">
          <g fill="#7a1616"><rect x="-26" y="-40" width="52" height="40" /><rect x="-20" y="-80" width="40" height="30" /><rect x="-14" y="-115" width="28" height="25" /></g>
          <g fill="#c92a2a"><path d="M-62-36-34-52H34L62-36Q0-46-62-36Z" /><path d="M-48-76-26-90H26L48-76Q0-84-48-76Z" /><path d="M-36-112-18-126H18L36-112Q0-118-36-112Z" /></g>
          <path fill="#f5a623" d="M-3-126 0-152 3-126Z" />
        </g>
        <g transform="translate(900 700) scale(1.3)">
          <path fill="#e9dfc8" d="M-92 0h184v-14H-78v0h156v-14H-64z" />
          <path fill="#f7f0dc" d="M-70-28a70 70 0 0 1 140 0z" />
          <rect x="-20" y="-128" width="40" height="30" fill="#f5a623" />
          <g fill="#1d1511"><circle cx="-8" cy="-114" r="3" /><circle cx="8" cy="-114" r="3" /></g>
          <path fill="#f5a623" d="M-16-128 0-190 16-128Z" />
        </g>
        <path fill="#0a2b29" d="M0 760Q300 720 600 752T1200 735V800H0Z" />
        <g className="flags" fill="none" strokeWidth="14">
          {["#2d6cdf", "#f7f0dc", "#d62828", "#2e9d4f", "#f4c542"].map((c, i) => (
            <path key={c} d="M-20 300Q300 450 600 340T1220 380" stroke={c} strokeDasharray="14 56" strokeDashoffset={-14 * i} />
          ))}
          <path d="M-20 300Q300 450 600 340T1220 380" stroke="#ffffff55" strokeWidth="1.5" />
        </g>
      </svg>
      <div className="floaters">
        {FLOAT.map((s, i) => (
          <span key={i} style={{ left: 6 + i * 12 + "%", animationDelay: -i * 2.3 + "s", animationDuration: 14 + (i % 4) * 3 + "s", fontSize: 22 + (i % 3) * 10 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}
