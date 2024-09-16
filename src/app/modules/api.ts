import { getIntrospectionQuery } from 'graphql/utilities';
import { buildClientSchema } from 'graphql';

export const getDataGraphApi = (url: string, query: string, variables = {}, headers = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      return Promise.reject(error);
    });
};

interface RequestOptions extends RequestInit {
  headers: {
    [key: string]: string;
  };
  method: string;
  body?: string;
}

export const getDataRestApi = (url: string, query = {}, variables = {}, headers = {}, method: string) => {
  const queryString = new URLSearchParams({ ...variables }).toString();
  const fullUrl = `${url}?${queryString}`;

  const options: RequestOptions = {
    method: method,
    headers: headers,
  };

  if (method === 'POST') {
    options.body = JSON.stringify(query);
  }

  return fetch(fullUrl, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      return Promise.reject(error);
    });
};

export const getGraphQLSchema = (url: string, headers = {}) => {
  const introspectionQuery = getIntrospectionQuery();

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: introspectionQuery }),
  })
    .then((response) => response.json())
    .then((data) => {
      const schema = buildClientSchema(data.data);
      const typeMap = schema.getTypeMap();
      return Object.values(typeMap).filter((type) => !type.name.startsWith('__'));
    })
    .catch((error) => {
      console.error('Error fetching schema:', error);
      return Promise.reject(error);
    });
};
