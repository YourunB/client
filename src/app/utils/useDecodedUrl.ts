import { usePathname, useSearchParams } from 'next/navigation';
import { decodeBase64 } from '../modules/encodeBase64';
import { useEffect, useState } from 'react';
import { RestData } from './saveData';

export function useDecodedUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<RestData | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const pathParts = pathname.split('/').filter(Boolean);

    if (pathParts.length >= 3) {
      const [, method, encodedInput, encodedQuery] = pathParts;

      const decodedInput = encodedInput ? decodeBase64(encodedInput) : '';
      const decodedQuery = encodedQuery ? decodeBase64(encodedQuery) : '';

      const headers = searchParams.get('headers');
      const variables = searchParams.get('variables');

      setData({
        method,
        input: decodedInput || '',
        query: decodedQuery || '',
        headers: headers ? decodeBase64(headers) : '',
        variables: variables ? decodeBase64(variables) : '',
      });
    }
  }, [pathname, searchParams]);
  return data;
}
