import Head from "next/head";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Head>
        <title>Next.js on Azure</title>
        <meta name="description" content="Next.js app deployed on Azure Static Web Apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
