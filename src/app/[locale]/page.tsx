import s from './page.module.css';

import AboutTeam from '../components/AboutTeam';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Welcome page',
};

export default function PageHome() {
  return (
    <main className={s.page} data-testid="home">
      <AboutTeam />
    </main>
  );
}
