export default function Layout({ children }) {
  const menuItems = [
    { name: "Dashboard", link: "/" },
    { name: "Khách hàng", link: "/khach-hang" },
    { name: "Lịch hẹn", link: "/lich-hen" },
    { name: "Liệu trình", link: "/lieu-trinh" },
    { name: "Kho", link: "/kho" },
    { name: "POS", link: "/pos" },
    { name: "CSKH", link: "/cskh" },
    { name: "Báo cáo", link: "/bao-cao" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#F9D9E4",
          padding: "20px",
          borderRight: "1px solid #eee",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            background: "#F3C1D8",
            borderRadius: "10px",
            margin: "0 auto",
          }}
        ></div>

        <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "600" }}>
          SPA LOGO
        </p>

        <div style={{ marginTop: "30px" }}>
          {menuItems.map((m, idx) => (
            <a
              key={idx}
              href={m.link}
              style={{
                display: "block",
                padding: "12px 15px",
                marginBottom: "6px",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#333",
                fontWeight: "600",
              }}
            >
              {m.name}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#fafafa", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
