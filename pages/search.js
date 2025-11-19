import Head from 'next/head';
import SearchMap from '../components/SearchMap';

export default function Search() {
  return (
    <>
      <Head>
        <title>Search Professionals - Ofisio</title>
        <meta name="description" content="Search for professionals near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1 style={{ padding: '1rem', textAlign: 'center' }}>Search Professionals</h1>
        <SearchMap />
      </main>
    </>
  );
}
