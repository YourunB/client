export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Author = {
  name: string;
  github: string;
  description: string;
  image: string;
  location: string;
};

export type Language = 'en' | 'ru';
