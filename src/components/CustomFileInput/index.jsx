// pages/index.js
import Head from 'next/head';
import CustomFileInput from '../components/CustomFileInput';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Custom File Upload</title>
        <meta name="description" content="Custom file upload input example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Upload an Image</h1>
        <CustomFileInput />
      </main>
    </div>
  );
}
