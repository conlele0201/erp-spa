// pages/_app.js
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Trang dashboard (/) đã có sidebar riêng, KHÔNG bọc Layout
  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  // Các trang khác dùng Layout chung (sidebar mới)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
