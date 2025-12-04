import Link from "next/link";
import { useRouter } from "next/router";
import "../styles/sidebar.css";

export default function Layout({ children }) {
  const router = useRouter();
  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Khách hàng", path: "/khach-hang" },
    { label: "Lịch hẹn", path: "/lich-hen" },
    { label: "Liệu trình", path: "/lieu-trinh" },
    { label: "Kho", path: "/kho" },
    { label: "POS", path: "/pos" },
    { label: "CSKH", path: "/cskh" },
    { label: "Báo cáo", path: "/bao-cao" },
  ];

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-logo">SPA LOGO</div>

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <Link key={item.path} href={item.path} legacyBehavior>
              <a
                className={
                  router.pathname === item.path
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
