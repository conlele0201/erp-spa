// pages/_app.js
import "../styles/globals.css";
import "../styles/sidebar.css";       // ✅ CSS sidebar import ở đây

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
