import { User } from 'firebase/auth';

export type RestData = {
  method: string;
  input: string;
  query: string;
  headers: string | null;
  variables: string | null;
};

export const saveDataFromRest = (dataToSave: RestData, user: User['email']) => {
  const storageKey = `${user}-data`;
  const existingData = localStorage.getItem(storageKey);
  const data = existingData ? JSON.parse(existingData) : [];
  data.push(dataToSave);
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getDataFromLS = (user?: User['email']): RestData[] => {
  const storageKey = `${user}-data`;
  const existingData = localStorage.getItem(storageKey);
  const data = existingData ? JSON.parse(existingData) : [];
  return data;
};
