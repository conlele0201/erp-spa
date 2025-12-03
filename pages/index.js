export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* MENU TRÁI – FULL HỒNG ĐẬM */}
      <aside
        style={{
          width: "260px",
          background: "#f4c7d9", // Hồng đậm hơn
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRight: "1px solid #e3b7c8",
          height: "100%",
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#f1bbcd", // nền logo hồng đậm
              borderRadius: "14px",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: "12px", fontWeight: "700", color: "#333" }}>
            SPA LOGO
          </p>
        </div>

        {/* MENU */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {menuItem("Dashboard")}
          {menuItem("Khách hàng")}
          {menuItem("Lịch hẹn")}
          {menuItem("Liệu trình")}
          {menuItem("Kho")}
          {menuItem("POS")}
          {menuItem("CSKH")}
          {menuItem("Báo cáo")}
          {menuItem("Hệ thống")}
        </nav>
      </aside>

      {/* PHẦN NỘI DUNG */}
      <main style={{ flex: 1, background: "#f7f7f8" }}>
        
        {/* HEADER */}
        <header
          style={{
            height: "65px",
            background: "#ffffff",
            borderBottom: "1px solid #ececec",
            padding: "0 25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "600" }}>ERP SPA Dashboard</h2>

          <div
            style={{
              width: "42px",
              height: "42px",
              background: "#d1d5db",
              borderRadius: "50%",
            }}
          ></div>
        </header>

        {/* CONTENT */}
        <section style={{ padding: "30px" }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
            Welcome to ERP SPA
          </h3>

          <p style={{ marginTop: "10px", color: "#555" }}>
            Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của spa.
          </p>

          {/* KPI */}
          <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
            {kpiCard("Khách hôm nay", "24")}
            {kpiCard("Doanh thu hôm nay", "12,500,000đ")}
            {kpiCard("Lịch hẹn sắp tới", "8")}
          </div>
        </section>
      </main>
    </div>
  );
}

/* MENU ITEM – HOVER + ACTIVE HỒNG ĐẬM */
function menuItem(label) {
  return (
    <div
      style={{
        padding: "12px 12px",
        fontWeight: "600",
        color: "#333",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.25s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = "#e8a8c0")}
      onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
      onMouseDown={(e) => (e.currentTarget.style.background = "#dd8eac")}
    >
      {label}
    </div>
  );
}

/* KPI CARDS */
function kpiCard(title, value) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        minWidth: "220px",
      }}
    >
      <p style={{ margin: 0, color: "#777" }}>{title}</p>
      <h2 style={{ marginTop: "8px", fontSize: "22px" }}>{value}</h2>
    </div>
  );
}
