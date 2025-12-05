// pages/_app.js
import "../styles/globals.css";
import "../styles/sidebar.css"; // import sidebar dùng chung
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
