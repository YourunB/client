'use client';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import Image from 'next/image';
import RSLogo from '../../../public/icons/rs-logo.png';
import { Author } from '@/app/type';

const Footer = () => {
  const { t } = useTranslation();

  const authors: Author[] = [
    {
      name: t('authors.liza.name'),
      github: 'https://github.com/Lilo002',
      description: t('authors.liza.description'),
      image: '/images/liza.png',
      location: t('authors.liza.location'),
    },
    {
      name: t('authors.yury.name'),
      github: 'https://github.com/YourunB',
      description: t('authors.yury.description'),
      image: '/images/yury.jpg',
      location: t('authors.yury.location'),
    },
    {
      name: t('authors.valery.name'),
      github: 'https://github.com/valeryaosta',
      description: t('authors.valery.description'),
      image: '/images/valery.jpg',
      location: t('authors.valery.location'),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.authorsSection}>
        <p className={styles.authorsTitle}>{t('authors.title')}:</p>
        <div className={styles.authorsList}>
          {authors.map((author) => (
            <p key={author.name} className={styles.authorItem}>
              <a href={author.github} target="_blank" rel="noreferrer" className={styles.authorLink}>
                {author.name}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className={styles.copyLogo}>
        <div className={styles.copySection}>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
        <div className={styles.logoSection}>
          <a href="https://rs.school/courses/reactjs" title="RS School React Course">
            <Image src={RSLogo} alt={'RS Logo'} width={86} height={45} className={styles.rsLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
