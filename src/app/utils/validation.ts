import { TFunction } from 'i18next';
import * as Yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const createLoginSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string().matches(emailRegex, t('validation.invalidEmail')).required(t('validation.emailRequired')),
    password: Yup.string().required(t('validation.passwordRequired')),
  });

export const createRegisterSchema = (t: TFunction) =>
  Yup.object({
    name: Yup.string().required(t('validation.nameRequired')),
    email: Yup.string().matches(emailRegex, t('validation.invalidEmail')).required(t('validation.emailRequired')),
    password: Yup.string()
      .required(t('validation.passwordRequired'))
      .matches(
        /^(?=.*[\p{Ll}\p{Lu}])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]).+$/u,
        t('validation.passwordComplexity')
      )
      .min(8, t('validation.passwordLength')),
    confirmPassword: Yup.string()
      .required(t('validation.confirmPasswordRequired'))
      .oneOf([Yup.ref('password')], t('validation.passwordsMustMatch')),
  });
