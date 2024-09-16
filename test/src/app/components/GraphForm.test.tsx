import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphForm from '../../../../src/app/components/GraphForm';
import * as api from '../../../../src/app/modules/api';
import * as formatCodeUtil from '../../../../src/app/utils/formatCode';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDecodedUrl } from '../../../../src/app/utils/useDecodedUrl';

vi.mock('../../../../src/app/utils/useDecodedUrl');
vi.mock('../../../../src/app/utils/saveData');
vi.mock('../../../../src/app/utils/getData');
vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('../../../../src/firebase.ts', () => ({
  auth: {
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  },
  firestore: {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    set: vi.fn(),
    get: vi.fn(),
  },
}));
vi.mock('../../../../src/app/modules/api', () => ({
  getDataGraphApi: vi.fn(),
}));
vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>Mocked CodeMirror</div>,
}));
vi.mock('../../../../src/app/utils/formatCode', () => ({
  formatCode: vi.fn(),
}));

describe('GraphForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the component correctly', () => {
    (useDecodedUrl as Mock).mockReturnValue(null);
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<GraphForm />);

    expect(screen.getByPlaceholderText('Base URL...')).toBeInTheDocument();
    expect(screen.getByTitle('Format Code')).toBeInTheDocument();
    expect(screen.getByTitle('Documentation Explorer')).toBeInTheDocument();
    expect(screen.getByTitle('Execute Query')).toBeInTheDocument();
  });

  it('handles input changes correctly', async () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    (useDecodedUrl as vi.Mock).mockReturnValue({
      headers: '',
      input: '/en/graphql',
      query: '',
      variables: '',
    });

    render(<GraphForm />);

    fireEvent.change(screen.getByPlaceholderText('Base URL...'), {
      target: { value: '/en/graphql' },
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Base URL...')).toHaveValue('/en/graphql');
    });
  });

  it('formats code in different areas when "Format Code" button is clicked', async () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    (useDecodedUrl as vi.Mock).mockReturnValue({
      headers: '',
      input: '',
      query: 'query { test }',
      variables: '{"test": "value"}',
    });

    (formatCodeUtil.formatCode as vi.Mock)
      .mockResolvedValueOnce('formatted query')
      .mockResolvedValueOnce('formatted variables')
      .mockResolvedValueOnce('formatted headers');

    render(<GraphForm />);

    fireEvent.click(screen.getByTitle('Format Code'));

    await waitFor(() => {
      expect(formatCodeUtil.formatCode).toHaveBeenCalledWith('query { test }', 'graphql');
      expect(formatCodeUtil.formatCode).toHaveBeenCalledWith('{"test": "value"}', 'json');
    });
  });

  it('loads data from API and updates result value', async () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    (useDecodedUrl as vi.Mock).mockReturnValue({
      headers: '{}',
      input: 'https://example.com/graphql',
      query: 'query { test }',
      variables: '{}',
    });

    (api.getDataGraphApi as vi.Mock).mockResolvedValue({ data: 'some data' });

    render(<GraphForm />);

    fireEvent.click(screen.getByTitle('Execute Query'));
  });

  it('toggles variables and headers visibility correctly', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);
    (useDecodedUrl as Mock).mockReturnValue({
      headers: '',
      input: '',
      query: '',
      variables: '',
    });

    render(<GraphForm />);

    fireEvent.click(screen.getByText('Variables'));
    fireEvent.click(screen.getByText('Headers'));
  });

  it('creates URL correctly on input change', async () => {
    (useAuthState as Mock).mockReturnValue([null, false]);
    (useDecodedUrl as Mock).mockReturnValue({
      headers: '',
      input: 'http://localhost:3000/en/graph/',
      query: '',
      variables: '',
    });

    render(<GraphForm />);

    fireEvent.change(screen.getByPlaceholderText('Base URL...'), {
      target: { value: 'http://localhost:3000/en/graph/' },
    });
  });
});
