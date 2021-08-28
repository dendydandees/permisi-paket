import Head from 'next/head';
// components
import Footer from './footer.js';

export const title = 'Permisi Paket';
export const titleSecondary = 'Cek yuk perjalanan paketmu';
export const description =
  'Beli barang dari online shop dan tidak kunjung datang? Padahal yang diharapkan ada yang teriak Permisi Paket! Jangan khawatir, cek yuk perjalanan paketmu.';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="description" content={description} />
        <title>
          {title} | {titleSecondary}
        </title>
      </Head>

      <main className="w-full md:w-screen">{children}</main>

      <Footer />
    </>
  );
}
