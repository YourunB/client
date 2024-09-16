/* eslint-disable react-refresh/only-export-components */
import s from './page.module.css';
import { Metadata } from 'next';
import Client from '../../components/Client';

export const metadata: Metadata = {
  title: 'Client',
  description: 'Client page',
};

export default function ClientPage() {
  return (
    <main className={s.page}>
      <Client />
    </main>
  );
}
