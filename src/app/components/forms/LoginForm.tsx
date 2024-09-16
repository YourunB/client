'use client';
import s from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { logInWithEmailAndPassword, auth } from '../../../firebase';
import { LoginData } from '../../type';
import { useTranslation } from 'react-i18next';
import { useError } from '../../hooks/useError';
import { createLoginSchema } from '../../../app/utils/validation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

type Error = {
  message: string;
  code?: string;
};

export default function LoginForm() {
  const { showError } = useError();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [loading, router, user]);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(createLoginSchema(t)),
    mode: 'onChange',
  });

  const submitFrom = async (data: LoginData) => {
    try {
      await logInWithEmailAndPassword(data);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        showError((error as Error).message);
      } else {
        showError(t('errors.unknown'));
      }
    }
  };

  return (
    !loading &&
    !user && (
      <form className={s['login__form']} onSubmit={handleSubmit(submitFrom)}>
        <div className={s['login__content']}>
          <div className={s['login__field']}>
            <label htmlFor="email" className={s['login__label']}>
              {t('fields.email.name')}:
            </label>
            <input
              {...register('email')}
              type="text"
              className={s['login__input']}
              placeholder={t('fields.email.placeholder')}
              id="email"
            />
          </div>
          {errors.email && <div className={s.error}>{errors.email.message}</div>}
        </div>
        <div className={s['login__content']}>
          <div className={s['login__field']}>
            <label htmlFor="password" className={s['login__label']}>
              {t('fields.password.name')}:
            </label>
            <input
              {...register('password')}
              type="password"
              className={s['login__input']}
              placeholder={t('fields.password.placeholder')}
              id="password"
              autoComplete="off"
            />
          </div>
          {errors.password && <div className={s.error}>{errors.password.message}</div>}
        </div>

        <div className={s['login__btns']}>
          <button disabled={!isValid} className={s['login__btn']} type="submit">
            {t('login')}:
          </button>
        </div>
        <div className={s['login__link']}>
          {t('doNotHaveAccount')}? <Link href="/register">{t('register')}</Link>
          {t('now')}.
        </div>
      </form>
    )
  );
}
