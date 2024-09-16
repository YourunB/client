import Link from 'next/link';
import styles from '../Header.module.css';
import { useTranslation } from 'react-i18next';

const LinksForUser = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/graph" className={styles.homeLink}>
        {t('Graph')}
      </Link>
      <Link href="/rest" className={styles.homeLink}>
        {t('Rest')}
      </Link>
      <Link href="/history" className={styles.homeLink}>
        {t('history.rout')}
      </Link>
    </>
  );
};

export default LinksForUser;
