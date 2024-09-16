import { Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDecodedUrl } from '../../../../src/app/utils/useDecodedUrl';
import { useAuthState } from 'react-firebase-hooks/auth';
import RestForm from '../../../../src/app/components/RestForm';
import { getDataRestApi } from '../../../../src/app/modules/api';
import { saveDataFromRest } from '../../../../src/app/utils/saveData';
import { formatCode } from '../../../../src/app/utils/formatCode';

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
  getDataRestApi: vi.fn(),
}));
vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>Mocked CodeMirror</div>,
}));
vi.mock('../../../../src/app/utils/formatCode', () => ({
  formatCode: vi.fn(),
}));

describe('RestForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    (useDecodedUrl as Mock).mockReturnValue(null);
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<RestForm />);

    expect(screen.getByPlaceholderText('Base URL...')).toBeInTheDocument();
    expect(screen.getByTitle('Format Code')).toBeInTheDocument();
    expect(screen.getByTitle('Execute Query')).toBeInTheDocument();
  });

  it('loads data from the API and updates the result area', async () => {
    (useDecodedUrl as Mock).mockReturnValue(null);
    const mockUser = { email: 'test@example.com' };
    (useAuthState as Mock).mockReturnValue([mockUser, false]);

    const mockApiData = { results: [{ name: 'Rick Sanchez' }] };
    (getDataRestApi as Mock).mockResolvedValue(mockApiData);

    render(<RestForm />);

    fireEvent.click(screen.getByTitle('Execute Query'));

    await waitFor(() => expect(getDataRestApi).toHaveBeenCalled());

    const resultTextDiv = screen.getAllByText('Mocked CodeMirror');
    expect(resultTextDiv[0]).toBeInTheDocument();
    expect(saveDataFromRest).toHaveBeenCalledWith(expect.any(Object), mockUser.email);
  });

  it('formats all code areas when Format Code button is clicked', async () => {
    (useDecodedUrl as Mock).mockReturnValue(null);
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<RestForm />);

    fireEvent.click(screen.getByTitle('Format Code'));

    await waitFor(() => {
      expect(formatCode).toHaveBeenCalledTimes(2);
    });
  });

  it('toggles the visibility of variables and headers areas', async () => {
    (useDecodedUrl as Mock).mockReturnValue(null);
    (useAuthState as Mock).mockReturnValue([null, false]);

    render(<RestForm />);

    const toggleVariablesButton = screen.getByText('Variables');
    const toggleHeadersButton = screen.getByText('Headers');

    fireEvent.click(toggleVariablesButton);
    await waitFor(() => {
      expect(screen.getByText('Variables').closest('button')?.className).toContain('btn-toggle_active');
    });

    fireEvent.click(toggleHeadersButton);
    await waitFor(() => {
      expect(screen.getByText('Headers').closest('button')?.className).toContain('btn-toggle_active');
    });
  });

  // Add more tests for other interactions, such as changing input values, formatting, etc.
});
