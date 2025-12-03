import React from "react";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      
      {/* MENU TRÁI */}
      <aside
        style={{
          width: "240px",
          background: "#1f2937",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Logo Spa (sau này thay bằng ảnh thật từ Supabase) */}
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#ffffff33",
              margin: "0 auto",
              borderRadius: "8px",
            }}
          ></div>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>SPA LOGO</p>
        </div>

        {/* Menu items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a style={menuItemStyle}>Dashboard</a>
          <a style={menuItemStyle}>Khách hàng</a>
          <a style={menuItemStyle}>Lịch hẹn</a>
          <a style={menuItemStyle}>Liệu trình</a>
          <a style={menuItemStyle}>Kho</a>
          <a style={menuItemStyle}>POS</a>
          <a style={menuItemStyle}>CSKH</a>
          <a style={menuItemStyle}>Báo cáo</a>
          <a style={menuItemStyle}>Hệ thống</a>
        </nav>
      </aside>

      {/* KHU VỰC NỘI DUNG */}
      <main style={{ flex: 1, background: "#f4f4f5" }}>
        
        {/* HEADER */}
        <header
          style={{
            height: "60px",
            background: "#ffffff",
            borderBottom: "1px solid #ddd",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0 }}>ERP SPA Dashboard</h2>

          {/* Avatar admin */}
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#ccc",
              borderRadius: "50%",
            }}
          ></div>
        </header>

        {/* CONTENT */}
        <section style={{ padding: "20px" }}>
          <h3>Welcome to ERP SPA</h3>
          <p>Trang chủ hiển thị các widget, KPI, thông báo, báo cáo nhanh…</p>
        </section>
      </main>
    </div>
  );
}

const menuItemStyle = {
  padding: "10px 12px",
  background: "#374151",
  borderRadius: "6px",
  cursor: "pointer",
};
