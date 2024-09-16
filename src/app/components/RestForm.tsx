'use client';
import s from './RestForm.module.css';
import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useRef, useCallback, useState } from 'react';
import { formatCode } from '../utils/formatCode';
import { getDataRestApi } from '../modules/api';
import { encodeBase64 } from '../modules/encodeBase64';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { saveDataFromRest } from '../utils/saveData';
import { useDecodedUrl } from '../utils/useDecodedUrl';
import { usePathname } from 'next/navigation';
import { MethodSelector } from './MethodSelector';

export default function RestForm() {
  const data = useDecodedUrl();
  const [inputValue, setInputValue] = useState('https://rickandmortyapi.com/api/character');
  const resultCodeMirrorRef = useRef(null);
  const [showVariables, setShowVariables] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [queryValue, setQueryValue] = useState('');
  const [variablesValue, setVariablesValue] = useState(`{
  "name": "Rick",
  "status": "alive"
}`);
  const [headersValue, setHeadersValue] = useState(`{
  "X-Custom-Header": "CustomValue"
}`);
  const [resultValue, setResultValue] = useState('');
  const [user, loading] = useAuthState(auth);
  const [method, setMethod] = useState('GET');
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (data) {
      const { headers, input, method, query, variables } = data;
      setHeadersValue(headers || '');
      setVariablesValue(variables || '');
      setQueryValue(query || '');
      setInputValue(input || '');
      setMethod(method);
    }
  }, [loading, data]);

  const createUrl = (value: string) => {
    const pathParts = pathname.split('/').filter(Boolean);
    const language = pathParts[0] || 'en';
    const url = new URL(
      `${location.origin}/${language}/${method}/${encodeBase64(value || inputValue)}/${encodeBase64(queryValue)}`
    );
    const params = new URLSearchParams();

    if (headersValue) params.append('headers', encodeBase64(headersValue));
    if (variablesValue) params.append('variables', encodeBase64(variablesValue));

    url.search = params.toString();
    window.history.pushState({}, '', url);
  };

  const handleBlur = () => {
    createUrl(inputValue);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    createUrl(value);
    setInputValue(value);
  };

  const onChangeQuery = useCallback((val: string) => {
    setQueryValue(val);
  }, []);

  const onChangeVariables = useCallback((val: string) => {
    setVariablesValue(val);
  }, []);

  const onChangeHeaders = useCallback((val: string) => {
    setHeadersValue(val);
  }, []);

  const onChangeResult = useCallback((val: string) => {
    setResultValue(val);
  }, []);

  const toggleShowVariables = () => {
    setShowVariables(!showVariables);
    if (showHeaders) setShowHeaders(!showHeaders);
  };

  const toggleShowHeaders = () => {
    setShowHeaders(!showHeaders);
    if (showVariables) setShowVariables(!showVariables);
  };

  const format = async (code: string, type: string, area: string) => {
    if (code && type) {
      const resultFormat = await formatCode(code, type);
      if (typeof resultFormat === 'string') {
        if (area === 'query') setQueryValue(resultFormat);
        if (area === 'variables') setVariablesValue(resultFormat);
        if (area === 'headers') setHeadersValue(resultFormat);
        if (area === 'result') setResultValue(resultFormat);
      }
    }
  };

  const formatAllAreas = () => {
    format(queryValue, 'graphql', 'query');
    format(variablesValue, 'json', 'variables');
    format(headersValue, 'json', 'headers');
  };

  const loadDataFromApi = async () => {
    try {
      const variables = JSON.parse(variablesValue || '{}');
      const headers = JSON.parse(headersValue || '{}');
      const data = await getDataRestApi(inputValue, queryValue, variables, headers, method);
      const result = JSON.stringify(data, null, 2);
      setResultValue(result);

      const dataToSave = {
        input: inputValue,
        query: queryValue,
        variables: JSON.stringify(variables),
        headers: JSON.stringify(headers),
        method: method,
      };

      if (user) saveDataFromRest(dataToSave, user?.email);
    } catch {
      setResultValue(
        'Error parsing variables or fetching data. Please ensure variables and headers are in valid JSON format.'
      );
    }
  };

  return (
    <div className={s['rest-form']}>
      <div className={s.selectors}>
        <MethodSelector method={method} setMethod={setMethod} />
      </div>
      <div className={s.top}>
        <input className={s['top__input']} value={inputValue} onChange={onChangeInput} placeholder="Base URL..." />
        <button className={s['top__btn']} title="Format Code" onClick={() => formatAllAreas()}>
          &#182;
        </button>
        <button className={s['top__btn']} title="Execute Query" onClick={() => loadDataFromApi()}>
          &#10003;
        </button>
      </div>

      <div className={s.box}>
        <div className={s['form-left']}>
          <CodeMirror
            value={queryValue}
            height="600px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChangeQuery}
            onBlur={handleBlur}
            theme={githubDark}
          />
          <button
            className={`${s['btn-toggle']} ${showVariables ? s['btn-toggle_active'] : ''}`}
            onClick={() => toggleShowVariables()}
          >
            Variables
          </button>
          <button
            className={`${s['btn-toggle']} ${showHeaders ? s['btn-toggle_active'] : ''}`}
            onClick={() => toggleShowHeaders()}
          >
            Headers
          </button>
          {showVariables ? (
            <CodeMirror
              value={variablesValue}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={onChangeVariables}
              onBlur={handleBlur}
              theme={githubDark}
            />
          ) : null}
          {showHeaders ? (
            <CodeMirror
              value={headersValue}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={onChangeHeaders}
              onBlur={handleBlur}
              theme={githubDark}
            />
          ) : null}
        </div>

        <div className={s['form-right']}>
          <CodeMirror
            ref={resultCodeMirrorRef}
            value={resultValue}
            height="600px"
            extensions={[javascript({ jsx: true })]}
            onChange={onChangeResult}
            theme={githubDark}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
