'use client';
import s from './RegisterForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createRegisterSchema } from '../../../app/utils/validation';
import Link from 'next/link';
import { registerWithEmailAndPassword, auth } from '../../../firebase';
import { RegisterData } from '../../type';
import { useTranslation } from 'react-i18next';
import { useError } from '../../hooks/useError';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function RegisterForm() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { showError } = useError();

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    resolver: yupResolver(createRegisterSchema(t)),
    mode: 'onChange',
  });

  const submitFrom = async (data: RegisterData) => {
    try {
      await registerWithEmailAndPassword(data);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        showError((error as Error).message);
      } else {
        showError('An unknown error occurred');
      }
    }
  };

  return (
    !loading &&
    !user && (
      <form className={s['register__form']} onSubmit={handleSubmit(submitFrom)}>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="name" className={s['register__label']}>
              {t('fields.name.name')}:
            </label>
            <input
              {...register('name')}
              type="text"
              className={s['register__input']}
              placeholder={t('fields.name.placeholder')}
              id="name"
            />
          </div>
          {errors.name && <div className={s.error}>{errors.name.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="email" className={s['register__label']}>
              {t('fields.email.name')}:
            </label>
            <input
              {...register('email')}
              type="text"
              className={s['register__input']}
              placeholder={t('fields.email.placeholder')}
              id="email"
            />
          </div>
          {errors.email && <div className={s.error}>{errors.email.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="password" className={s['register__label']}>
              {t('fields.password.name')}:
            </label>
            <input
              {...register('password')}
              type="password"
              className={s['register__input']}
              placeholder={t('fields.password.placeholder')}
              id="password"
              autoComplete="password"
            />
          </div>
          {errors.password && <div className={s.error}>{errors.password.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="confirmPassword" className={s['register__label']}>
              {t('fields.confirmPassword.name')}:
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              className={s['register__input']}
              placeholder={t('fields.confirmPassword.placeholder')}
              id="confirmPassword"
              autoComplete="confirmPassword"
            />
          </div>
          {errors.confirmPassword && <div className={s.error}>{errors.confirmPassword.message}</div>}
        </div>

        <div className={s['register__btns']}>
          <button disabled={!isValid} className={s['register__btn']} type="submit">
            {t('register')}
          </button>
        </div>
        <div className={s['register__link']}>
          {t('alreadyHaveAccount')}? <Link href="/login">{t('login')}</Link>
          {t('now')}.
        </div>
      </form>
    )
  );
}
