import { getDataGraphApi, getDataRestApi, getGraphQLSchema } from '../../../../src/app/modules/api';

describe('API functions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDataGraphApi', () => {
    it('should successfully fetch data from the GraphQL API', async () => {
      const mockResponse = { data: { foo: 'bar' } };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const data = await getDataGraphApi('http://example.com/graphql', 'query {}');

      expect(fetch).toHaveBeenCalledWith('http://example.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'query {}', variables: {} }),
      });
      expect(data).toEqual(mockResponse);
    });

    it('should handle fetch errors', async () => {
      const mockError = new Error('Network Error');
      global.fetch = vi.fn(() => Promise.reject(mockError));

      await expect(getDataGraphApi('http://example.com/graphql', 'query {}')).rejects.toThrow('Network Error');
    });
  });

  describe('getDataRestApi', () => {
    it('should successfully fetch data from the REST API with GET method', async () => {
      const mockResponse = { foo: 'bar' };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const data = await getDataRestApi('http://example.com/api', {}, {}, {}, 'GET');

      expect(fetch).toHaveBeenCalledWith('http://example.com/api?', {
        method: 'GET',
        headers: {},
      });
      expect(data).toEqual(mockResponse);
    });

    it('should successfully fetch data from the REST API with POST method', async () => {
      const mockResponse = { foo: 'bar' };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const data = await getDataRestApi('http://example.com/api', { query: 'data' }, {}, {}, 'POST');

      expect(fetch).toHaveBeenCalledWith('http://example.com/api?', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({ query: 'data' }),
      });
      expect(data).toEqual(mockResponse);
    });

    it('should handle fetch errors', async () => {
      const mockError = new Error('Network Error');
      global.fetch = vi.fn(() => Promise.reject(mockError));

      await expect(getDataRestApi('http://example.com/api', {}, {}, {}, 'GET')).rejects.toThrow('Network Error');
    });
  });

  describe('getGraphQLSchema', () => {
    it('should handle fetch errors', async () => {
      const mockError = new Error('Network Error');
      global.fetch = vi.fn(() => Promise.reject(mockError));

      await expect(getGraphQLSchema('http://example.com/graphql')).rejects.toThrow('Network Error');
    });
  });
});
