import '../styles/globals.css';
// context
import { TrackingProvider } from '../context/tracking';

function MyApp({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <Component {...pageProps} />
    </TrackingProvider>
  );
}

export default MyApp;
