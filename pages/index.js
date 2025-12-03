import React, { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* MENU TRÁI NỀN TRẮNG */}
      <aside
        style={{
          width: "260px",
          background: "#ffffff",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRight: "1px solid #e5e7eb",
          height: "100%",
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#f4c7d9",
              borderRadius: "14px",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: "12px", fontWeight: "700", color: "#444" }}>
            SPA LOGO
          </p>
        </div>

        {/* MENU */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {menuItem("Dashboard", activeMenu, setActiveMenu)}
          {menuItem("Khách hàng", activeMenu, setActiveMenu)}
          {menuItem("Lịch hẹn", activeMenu, setActiveMenu)}
          {menuItem("Liệu trình", activeMenu, setActiveMenu)}
          {menuItem("Kho", activeMenu, setActiveMenu)}
          {menuItem("POS", activeMenu, setActiveMenu)}
          {menuItem("CSKH", activeMenu, setActiveMenu)}
          {menuItem("Báo cáo", activeMenu, setActiveMenu)}
          {menuItem("Hệ thống", activeMenu, setActiveMenu)}
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
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "600" }}>
            ERP SPA Dashboard
          </h2>

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
            Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của
            spa.
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

/* MENU ITEM – FULL TRÀN VIỀN KHI HOVER/ACTIVE */
function menuItem(label, activeMenu, setActiveMenu) {
  return (
    <div
      onClick={() => setActiveMenu(label)}
      style={{
        padding: "14px 16px",
        fontWeight: "600",
        color: "#333",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.25s",
        width: "100%", // tràn full ngang
        boxSizing: "border-box", // không dư mép
        background: activeMenu === label ? "#e8a8c0" : "transparent",
      }}
      onMouseOver={(e) => {
        if (activeMenu !== label) e.currentTarget.style.background = "#f4c7d9";
      }}
      onMouseOut={(e) => {
        if (activeMenu !== label)
          e.currentTarget.style.background = "transparent";
      }}
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
