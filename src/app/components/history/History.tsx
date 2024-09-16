'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useEffect, useState } from 'react';
import { getDataFromLS, RestData } from '../../utils/saveData';
import HistoryEmpty from './HistoryEmpty';
import HistoryList from './HistoryList';

export default function History() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState<RestData[]>([]);

  useEffect(() => {
    if (loading) return;
    setData(getDataFromLS(user?.email));
  }, [loading, user?.email]);

  if (loading) return;
  return data.length ? <HistoryList data={data} /> : <HistoryEmpty />;
}
