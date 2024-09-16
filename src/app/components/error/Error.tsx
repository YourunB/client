'use client';
import s from './Error.module.css';
import { useError } from '../../../app/hooks/useError';

const Error: React.FC = () => {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className={s.error}>
      <div className={s.errorContent}>
        <span>{error}</span>
        <button onClick={clearError} className={s.errorClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Error;
