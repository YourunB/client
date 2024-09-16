export const encodeBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

export const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    console.error('Failed to decode base64 string');
    return null;
  }
};
