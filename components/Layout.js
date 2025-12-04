// /components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Khách hàng", path: "/khach-hang" },
    { name: "Lịch hẹn", path: "/lich-hen" },
    { name: "Liệu trình", path: "/lieu-trinh" },
    { name: "Kho", path: "/kho" },
    { name: "POS", path: "/pos" },
    { name: "CSKH", path: "/cskh" },
    { name: "Báo cáo", path: "/bao-cao" },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-block">
          <div className="logo-placeholder"></div>
          <div className="logo-text">SPA LOGO</div>
        </div>

        <nav className="menu-list">
          {menu.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={
                  router.pathname === item.path
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Nội dung */}
      <main className="content">{children}</main>
    </div>
  );
}
