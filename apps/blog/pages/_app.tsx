import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from '../api/client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to blog!</title>
      </Head>
      <div className="app">
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}

export default CustomApp;
