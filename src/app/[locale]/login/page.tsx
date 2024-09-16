import s from './page.module.css';

import LoginForm from '../../components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

export default function LoginPage() {
  return (
    <main className={s.login} data-testid="child">
      <LoginForm />
    </main>
  );
}
