// pages/_app.js
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/sidebar.css"; // 👈 THÊM DÒNG NÀY ĐỂ ÁP CSS CHO SIDEBAR

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Trang dashboard (/) dùng layout riêng, KHÔNG bọc Layout chung
  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  // Các trang khác (khách hàng, lịch hẹn, ...) bọc trong Layout + sidebar mới
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
