import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, Mock } from 'vitest';
import History from '../../../../../src/app/components/history/History';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDataFromLS, RestData } from '../../../../../src/app/utils/saveData';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('../../../../../src/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
  auth: {},
}));

vi.mock('../../../../../src/app/utils/saveData', () => ({
  getDataFromLS: vi.fn(),
}));

vi.mock('../../../../../src/app/components/history/HistoryEmpty', () => ({
  __esModule: true,
  default: () => <div>History Empty</div>,
}));

vi.mock('../../../../../src/app/components/history/HistoryList', () => ({
  __esModule: true,
  default: ({ data }: { data: RestData[] }) => <div>History List: {data.length}</div>,
}));

describe('History', () => {
  beforeEach(() => {
    (useAuthState as Mock).mockClear();
    (getDataFromLS as Mock).mockClear();
  });

  it('renders HistoryEmpty when data is empty', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);
    (getDataFromLS as Mock).mockReturnValue([]);

    render(<History />);

    expect(screen.getByText('History Empty')).toBeInTheDocument();
  });

  it('renders HistoryList when data is available', () => {
    (useAuthState as Mock).mockReturnValue([{ email: 'test@example.com' }, false]);
    (getDataFromLS as Mock).mockReturnValue([{ method: 'GET', input: 'input1' }]);

    render(<History />);

    expect(screen.getByText('History List: 1')).toBeInTheDocument();
  });

  it('does not render anything when loading', () => {
    (useAuthState as Mock).mockReturnValue([null, true]);

    render(<History />);

    expect(screen.queryByText('History Empty')).toBeNull();
    expect(screen.queryByText('History List:')).toBeNull();
  });
});
