import s from './page.module.css';

import RegisterForm from '../../components/forms/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register page',
};

export default function RegisterPage() {
  return (
    <main className={s.register} data-testid="child">
      <RegisterForm />
    </main>
  );
}
