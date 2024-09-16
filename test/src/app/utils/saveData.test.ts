import { saveDataFromRest, getDataFromLS, RestData } from '../../../../src/app/utils/saveData';
import { describe, it, expect, vi, Mock } from 'vitest';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
});

describe('saveDataFromRest', () => {
  const mockUserEmail = 'testuser@example.com';
  const mockRestData: RestData = {
    method: 'GET',
    input: 'input1',
    query: 'query1',
    variables: 'var1',
    headers: 'headers1',
  };

  it('should save data to localStorage when no previous data exists', () => {
    (localStorage.getItem as Mock).mockReturnValueOnce(null);

    saveDataFromRest(mockRestData, mockUserEmail);

    const expectedKey = `${mockUserEmail}-data`;
    expect(localStorage.setItem).toHaveBeenCalledWith(expectedKey, JSON.stringify([mockRestData]));
  });

  it('should append data to existing data in localStorage', () => {
    const existingData = [{ method: 'POST', input: 'input2', query: 'query2' }];
    (localStorage.getItem as Mock).mockReturnValueOnce(JSON.stringify(existingData));

    saveDataFromRest(mockRestData, mockUserEmail);

    const expectedData = [...existingData, mockRestData];
    const expectedKey = `${mockUserEmail}-data`;
    expect(localStorage.setItem).toHaveBeenCalledWith(expectedKey, JSON.stringify(expectedData));
  });
});

describe('getDataFromLS', () => {
  const mockUserEmail = 'testuser@example.com';

  it('should return an empty array if no data exists in localStorage', () => {
    (localStorage.getItem as Mock).mockReturnValueOnce(null);

    const data = getDataFromLS(mockUserEmail);
    expect(data).toEqual([]);
  });

  it('should return parsed data from localStorage', () => {
    const existingData = [{ method: 'GET', input: 'input1', query: 'query1' }];
    (localStorage.getItem as Mock).mockReturnValueOnce(JSON.stringify(existingData));

    const data = getDataFromLS(mockUserEmail);
    expect(data).toEqual(existingData);
  });
});
