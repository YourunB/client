'use client';
import s from './Client.module.css';

import { useEffect } from 'react';
import GraphForm from './GraphForm';
import RestForm from './RestForm';
import { usePathname, useRouter } from 'next/navigation';
import useCheckAuth from '../utils/useCheckAuth';

const Client = () => {
  useCheckAuth();
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');

  useEffect(() => {
    if (
      parts.length <= 1 ||
      (!['rest', 'get', 'post', 'graph'].includes(parts[1].toLowerCase()) &&
        !['rest', 'get', 'post', 'graph'].includes(parts[2].toLowerCase()))
    ) {
      router.push('/404');
    }
  }, [parts, router]);

  let codeForm = null;
  if (parts.length > 1) {
    if (
      parts[1].toLowerCase() === 'rest' ||
      parts[1].toLowerCase() === 'get' ||
      parts[1].toLowerCase() === 'post' ||
      parts[2].toLowerCase() === 'rest' ||
      parts[2].toLowerCase() === 'get' ||
      parts[2].toLowerCase() === 'post'
    ) {
      codeForm = (
        <>
          <h2 className={s['title']}>REST</h2>
          <RestForm />
        </>
      );
    } else if (parts[1].toLowerCase() === 'graph' || parts[2].toLowerCase() === 'graph') {
      codeForm = (
        <>
          <h2 className={s['title']}>GraphQL</h2>
          <GraphForm />
        </>
      );
    }
  }

  return <div data-testid="client">{codeForm}</div>;
};

export default Client;
