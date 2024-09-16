import History from '../../components/history/History';
import s from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'History',
  description: 'History page',
};

export default function HistoryPage() {
  return (
    <main className={s.page}>
      <History />
    </main>
  );
}
