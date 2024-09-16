'use client';
import { useEffect } from 'react';
import i18n from '../../i18n';
import { Language } from '../type';
import flagUS from '../../../public/icons/flag-us.png';
import flagRU from '../../../public/icons/flag-ru.png';
import { StaticImageData } from 'next/image';

export const languageOptions: { code: Language; label: string; flag: StaticImageData }[] = [
  { code: 'en', label: 'English', flag: flagUS },
  { code: 'ru', label: 'Русский', flag: flagRU },
];

const I18nInitializer = () => {
  useEffect(() => {
    i18n.init();
  }, []);

  return null;
};

export default I18nInitializer;
