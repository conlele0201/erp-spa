export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* MENU TRÁI SANG – TRẮNG – SPA */}
      <aside
        style={{
          width: "250px",
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              background: "#f5e7ef",
              borderRadius: "12px",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: "10px", color: "#444", fontWeight: "600" }}>
            SPA LOGO
          </p>
        </div>

        {/* MENU */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
            borderBottom: "1px solid #e5e7eb",
            padding: "0 25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "600" }}>ERP SPA Dashboard</h2>

          {/* Avatar */}
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

          <p style={{ marginTop: "10px", color: "#555", lineHeight: "1.6" }}>
            Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của spa.
          </p>

          {/* Đây là vị trí sau này sẽ thêm cards KPI */}
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

function menuItem(label) {
  return (
    <a
      style={{
        padding: "12px 15px",
        background: "#f5e7ef",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500",
        color: "#1f2937",
        border: "1px solid #e9d5df",
      }}
    >
      {label}
    </a>
  );
}

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
