import React, { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Khách hàng",
    "Lịch hẹn",
    "Liệu trình",
    "Kho",
    "POS",
    "CSKH",
    "Báo cáo",
    "Hệ thống",
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* SIDEBAR */}
      <Sidebar
        menuItems={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* MAIN CONTENT */}
      <MainContent />
    </div>
  );
}

/* ============================
     SIDEBAR
============================= */
function Sidebar({ menuItems, activeMenu, setActiveMenu }) {
  return (
    <div
      style={{
        width: "260px",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "25px", textAlign: "center" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#f4c7d9",
            borderRadius: "12px",
            margin: "0 auto",
          }}
        />
        <p style={{ marginTop: "10px", fontWeight: "600", color: "#444" }}>
          SPA LOGO
        </p>
      </div>

      <nav>
        {menuItems.map((label) => (
          <MenuItem
            key={label}
            label={label}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ label, activeMenu, setActiveMenu }) {
  const isActive = activeMenu === label;

  return (
    <div
      onClick={() => setActiveMenu(label)}
      style={{
        width: "100%",
        padding: "14px 25px",
        fontWeight: "600",
        cursor: "pointer",
        background: isActive ? "#e8a8c0" : "transparent",
        transition: "0.2s",
      }}
      onMouseOver={(e) => {
        if (!isActive) e.currentTarget.style.background = "#f4c7d9";
      }}
      onMouseOut={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </div>
  );
}

/* ============================
     MAIN CONTENT ERP
============================= */

function MainContent() {
  return (
    <div
      style={{
        flex: 1,
        background: "#f5f6fa",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          background: "#ffffff",
          padding: "20px 32px",
          borderBottom: "1px solid #e0e0e0",
          fontSize: "26px",
          fontWeight: "700",
        }}
      >
        ERP SPA Dashboard
      </div>

      {/* PAGE CONTENT */}
      <div style={{ padding: "32px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
          Welcome to ERP SPA
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của spa.
        </p>

        {/* KPI GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {kpiCard("Khách hôm nay", "24")}
          {kpiCard("Doanh thu hôm nay", "12,500,000đ")}
          {kpiCard("Lịch hẹn sắp tới", "8")}
        </div>
      </div>
    </div>
  );
}

/* KPI CARD COMPONENT */
function kpiCard(title, value) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ margin: 0, color: "#777" }}>{title}</p>
      <h2 style={{ marginTop: "10px", fontSize: "26px", fontWeight: "700" }}>
        {value}
      </h2>
    </div>
  );
}
