import { render } from '@testing-library/react';
import { describe, test, vi, beforeEach } from 'vitest';
import RootLayout from '../../../../src/app/[locale]/layout';
import PageHome from '../../../../src/app/[locale]/page';
import { ErrorProvider } from '../../../../src/app/components/error/ErrorProvider';
import I18nInitializer from '../../../../src/app/modules/i18nInitializer';
import Error from '../../../../src/app/components/error/Error';
import Header from '../../../../src/app/components/Header';
import GraphAnimation from '../../../../src/app/components/GraphAnimation';
import Footer from '../../../../src/app/components/Footer';

describe('RootLayout', () => {
  beforeEach(() => {
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
  });

  test('render layout', () => {
    render(
      <RootLayout>
        <ErrorProvider>
          <I18nInitializer />
          <Error />
          <Header />
          <PageHome />
          <div data-testid="test">Test Content</div>
          <GraphAnimation />
          <Footer />
        </ErrorProvider>
      </RootLayout>
    );
  });
});
