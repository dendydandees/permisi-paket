import Head from 'next/head';
// components
import Layout, { title, description } from '../components/layout';
import Header from '../components/index/header';
import Form from '../components/index/form';
import { Icon } from '@iconify/react';
// data backup
import { courier } from '../data/courier.js';
// import { trackingSicepatSample } from '../data/trackingSicepatSample.js';
// context
import { useTracking } from '../context/tracking';
// date-fns
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Home({ listCourier }) {
  // data backup
  // const {
  //   data: { summary, detail, history },
  // } = trackingSicepatSample;

  // context
  const { tracking, error } = useTracking();
  const { summary, detail, history } = tracking;

  return (
    <Layout>
      <Header title={title} description={description}>
        <Form listCourier={listCourier} />
      </Header>

      {/* if any tracking */}
      {Object.entries(tracking).length !== 0 ? (
        <section className="container mx-auto my-12">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-4">
            <div className="lg:col-span-4 bg-white rounded-md shadow-md p-4 space-y-10 self-start">
              <h5 className="font-bold text-xl">Info Pengiriman</h5>
              <table className="table-auto">
                <tbody>
                  <tr className="border-0">
                    <td>Kurir</td>
                    <td>:</td>
                    <td>
                      {summary?.courier}
                      {summary.service ? ` - ${summary?.service}` : ''}
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td>No Resi</td>
                    <td>:</td>
                    <td>{summary?.awb}</td>
                  </tr>
                  <tr className="border-0">
                    <td>Tanggal Pengiriman</td>
                    <td>:</td>
                    <td>
                      {format(
                        parseISO(summary?.date),
                        "d MMM yyyy, kk:mm 'WIB'",
                        {
                          locale: id,
                        },
                      )}
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td>Pengirim</td>
                    <td>:</td>
                    <td>
                      <h6 className="font-semibold">
                        {detail?.shipper}
                        <span className="block font-normal">
                          {detail?.origin}
                        </span>
                      </h6>
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td>Penerima</td>
                    <td>:</td>
                    <td>
                      <h6 className="font-semibold">
                        {detail?.receiver}
                        <span className="block font-normal">
                          {detail?.destination}
                        </span>
                      </h6>
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td>Harga Ongkir</td>
                    <td>:</td>
                    <td>Rp. {summary?.amount}</td>
                  </tr>
                  <tr className="border-0">
                    <td>Berat Barang</td>
                    <td>:</td>
                    <td>
                      {summary?.weight.match(/[^\d]/g)
                        ? summary?.weight.replace(/[^\d]/g, '')
                        : `${summary?.weight} Kg`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="lg:col-span-8 bg-white rounded-md shadow-md p-4 space-y-10">
              <h5 className="font-bold capitalize text-xl">
                Status Pengiriman :{' '}
                <span className="text-yellow-700">
                  {`${summary?.status.charAt(0)}${summary?.status
                    .slice(1)
                    .toLowerCase()}`}
                </span>
              </h5>
              <div className="space-y-6">
                {history.map((history, index) => {
                  return (
                    <div
                      key={index}
                      className="history block md:flex items-start justify-between"
                    >
                      <p
                        className={`m-0 relative block mr-3 ${
                          index === 0 ? ' text-yellow-700' : ''
                        }`}
                      >
                        {format(parseISO(history?.date), 'EEEE, d MMM yyyy', {
                          locale: id,
                        })}
                      </p>
                      <div
                        className={`description relative w-full md:w-6/12 lg:w-8/12 ${
                          index === 0 ? ' text-yellow-700' : ''
                        }`}
                      >
                        <p
                          className={`m-0 ${
                            index === 0 ? ' text-yellow-700' : ''
                          }`}
                        >
                          {format(parseISO(history?.date), "kk:mm 'WIB'", {
                            locale: id,
                          })}
                        </p>
                        <h6 className="block font-semibold">{history?.desc}</h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        </section>
      ) : (
        <section className="my-12">
          <div className="container mx-auto">
            <div className="bg-white rounded-md shadow-md px-4 py-10 w-full md:w-8/12 lg:w-6/12 mx-auto text-center space-y-4">
              {/* if error 400 or api key expired */}
              {error.status === 400 ? (
                <>
                  <p className="text-4xl m-0">😭</p>
                  <div className="space-y-2 w-full md:w-10/12 lg:w-8/12 mx-auto">
                    <h4 className="m-0 text-lg">Sedang dalam gangguan</h4>
                    <p>
                      Mohon maaf sistem sedang dalam gangguan, coba lagi nanti
                      ya!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Icon
                    icon="fa-solid:search"
                    inline
                    width="32px"
                    height="32px"
                    color="#D1D5DB"
                    className="mx-auto"
                  />
                  <div className="space-y-2 w-full md:w-10/12 lg:w-8/12 mx-auto">
                    <span className="m-0 block font-semibold text-xl">Belum ada data</span>
                    <p>
                      Silahkan cari paketmu terlebih dahulu dengan memasukan
                      nomor resi dan pilih kurir!
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.NEXT_PUBLIC_APIKEY_BINDERBYTE;
  const binderbyteUrl = process.env.NEXT_PUBLIC_BINDERBYTE_URL;

  const res = await fetch(`${binderbyteUrl}/list_courier?api_key=${apiKey}`);
  const data = await res.json();

  if (data.status === 400) {
    return {
      props: {
        listCourier: courier,
      },
    };
  }

  return {
    props: {
      listCourier: data,
    },
  };
}
