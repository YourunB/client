import { render, screen } from '@testing-library/react';
import AboutTeam from '../../../../src/app/components/AboutTeam';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('AboutTeam', () => {
  const authors = [
    {
      name: 'authors.liza.name',
      github: 'https://github.com/Lilo002',
      description: 'authors.liza.description',
      image: '/images/liza.png',
      location: 'authors.liza.location',
    },
    {
      name: 'authors.yury.name',
      github: 'https://github.com/YourunB',
      description: 'authors.yury.description',
      image: '/images/yury.jpg',
      location: 'authors.yury.location',
    },
    {
      name: 'authors.valery.name',
      github: 'https://github.com/valeryaosta',
      description: 'authors.valery.description',
      image: '/images/valery.jpg',
      location: 'authors.valery.location',
    },
  ];

  it('render authors section with title', () => {
    render(<AboutTeam />);
    expect(screen.getByText('mainPage.title')).toBeInTheDocument();
  });

  it('rende authors cards', () => {
    render(<AboutTeam authors={authors} />);
    authors.forEach((author) => {
      expect(screen.getByText(author.name)).toBeInTheDocument();
      expect(screen.getByText(`— ${author.location}`)).toBeInTheDocument();
      expect(screen.getByText(author.description)).toBeInTheDocument();
    });
  });

  it('render about section', () => {
    render(<AboutTeam />);
    expect(screen.getByText('mainPage.about.title')).toBeInTheDocument();
    expect(screen.getByText('mainPage.about.description')).toBeInTheDocument();
  });

  it('render RS School section', () => {
    render(<AboutTeam />);
    expect(screen.getByText('mainPage.rss.title')).toBeInTheDocument();
    expect(screen.getByText('mainPage.rss.description')).toBeInTheDocument();
  });
});
