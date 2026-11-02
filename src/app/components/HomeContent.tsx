import { HomePage } from '../home/HomePage';

// Preserve the existing preload entry without loading the retired homepage.
export function HomeContent() {
  return <HomePage route={window.location.hash} />;
}
