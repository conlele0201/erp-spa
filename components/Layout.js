// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const hideSidebar = router.pathname === "/"; // ẩn sidebar ở dashboard

  const menuItems = [
    { href: "/", label: "Dashboard" },
    { href: "/khach-hang", label: "Khách hàng" },
    { href: "/lich-hen", label: "Lịch hẹn" },
    { href: "/lieu-trinh", label: "Liệu trình" },
    { href: "/kho", label: "Kho" },
    { href: "/pos", label: "POS" },
    { href: "/cskh", label: "CSKH" },
    { href: "/bao-cao", label: "Báo cáo" },
  ];

  return (
    <div className="app-layout">
      {!hideSidebar && (
        <aside className="sidebar">
          <div className="logo">SPA LOGO</div>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={router.pathname === item.href ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      <main className="main-content">{children}</main>
    </div>
  );
}
