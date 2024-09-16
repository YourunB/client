import '../globals.css';
import GraphAnimation from '../components/GraphAnimation';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ErrorProvider } from '../components/error/ErrorProvider';
import Error from '../components/error/Error';
import I18nInitializer from '../modules/i18nInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <I18nInitializer />
          <Error />
          <Header />
          <GraphAnimation />
          {children}
          <Footer />
        </ErrorProvider>
      </body>
    </html>
  );
}
