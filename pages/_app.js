// pages/_app.js
import "../styles/globals.css";
import Sidebar from "../components/Sidebar";

export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
