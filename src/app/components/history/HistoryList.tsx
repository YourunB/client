import Link from 'next/link';
import s from './HistoryList.module.css';
import { RestData } from '@/app/utils/saveData';
import { encodeBase64 } from '../../modules/encodeBase64';
import { Url } from 'next/dist/shared/lib/router/router';
import { useTranslation } from 'react-i18next';

export default function HistoryList({ data }: { data: RestData[] }) {
  const { t } = useTranslation();
  const createURL = ({ headers, method, query, variables, input }: RestData): Url => {
    if (!input) return '';
    const url = new URL(`${location.origin}/${method}/${encodeBase64(input)}/${encodeBase64(query)}`);
    const params = new URLSearchParams();

    if (headers) params.append('headers', encodeBase64(headers));
    if (variables) params.append('variables', encodeBase64(variables));

    url.search = params.toString();
    return url;
  };

  return (
    <>
      <h2>{t('history.full')}</h2>
      <ul className={s.list}>
        {data.map((item, i) => {
          const { method, input } = item;
          return <Link href={createURL(item)} key={i} className={s.link}>{`${method} ${input}`}</Link>;
        })}
      </ul>
    </>
  );
}
