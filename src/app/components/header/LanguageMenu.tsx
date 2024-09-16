import { languageOptions } from '../../modules/i18nInitializer';
import { Language } from '../../type';
import Image from 'next/image';
import styles from '../Header.module.css';

type Props = {
  handleLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
};
const LanguageMenu: React.FC<Props> = ({ handleLanguageChange, currentLanguage }) => {
  return (
    <div className={styles.languageMenu}>
      {languageOptions.map((option) => (
        <button
          key={option.code}
          onClick={() => handleLanguageChange(option.code)}
          className={`${styles.languageOption} ${option.code === currentLanguage ? styles.selectedLanguage : ''}`}
          disabled={option.code === currentLanguage}
        >
          <Image src={option.flag} alt={option.label} className={styles.flagIcon} width={20} height={20} />
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageMenu;
