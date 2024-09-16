/* eslint-disable react-refresh/only-export-components */
import s from './page.module.css';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import homeIcon from '../../../../public/icons/home.svg';

export const metadata: Metadata = {
  title: '404',
  description: '404 page',
};

export default function PageNotFound() {
  return (
    <main className={s.page}>
      <div className={s['error-box']}>
        <h2 className={s['error-box__title']}>404</h2>
        <Link className={s['error-box__link']} href="/">
          <Image src={homeIcon} alt="Home" width={24} height={24} />
        </Link>
      </div>
    </main>
  );
}
