import Link from 'next/link';
import s from './HistoryEmpty.module.css';
import { useTranslation } from 'react-i18next';

export default function HistoryEmpty() {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('history.empty')}</h2>
      <div className={s.buttons}>
        <Link href="/graph" className={s.homeLink}>
          {t('Graph')}
        </Link>
        <Link href="/rest" className={s.homeLink}>
          {t('Rest')}
        </Link>
      </div>
    </>
  );
}
