// pages/_app.js
import "../styles/globals.css";      // CSS chung
import Layout from "../components/Layout";   // Layout sidebar

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
