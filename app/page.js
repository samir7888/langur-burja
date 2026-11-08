import Game from "./game";
import { Info } from "./landing";

// Server component: the SEO content below is rendered in the initial HTML
export default function Page() {
  return <Game info={<Info />} />;
}
