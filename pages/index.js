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
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            padding: "25px 25px 15px 25px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#f4c7d9",
              borderRadius: "12px",
              margin: "0 auto",
            }}
          ></div>
          <p
            style={{
              marginTop: "10px",
              fontWeight: "600",
              color: "#444",
            }}
          >
            SPA LOGO
          </p>
        </div>

        {/* MENU */}
        <nav style={{ flex: 1, padding: 0, margin: 0 }}>
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

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#f7f7f8", overflow: "auto" }}>
        {/* HEADER */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px 30px",
            fontSize: "24px",
            fontWeight: "700",
            borderBottom: "1px solid #ececec",
          }}
        >
          ERP SPA Dashboard
        </div>

        {/* CONTENT */}
        <div style={{ padding: "30px" }}>
          <h2 style={{ marginBottom: "10px" }}>Welcome to ERP SPA</h2>
          <p style={{ marginBottom: "30px", color: "#666" }}>
            Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của
            spa.
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            {kpiCard("Khách hôm nay", "24")}
            {kpiCard("Doanh thu hôm nay", "12,500,000đ")}
            {kpiCard("Lịch hẹn sắp tới", "8")}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ label, activeMenu, setActiveMenu }) {
  const isActive = activeMenu === label;

  return (
    <div
      onClick={() => setActiveMenu(label)}
      style={{
        width: "100%",                // tràn full ngang sidebar
        boxSizing: "border-box",
        padding: "14px 25px",
        fontWeight: "600",
        cursor: "pointer",
        background: isActive ? "#e8a8c0" : "transparent",
        color: "#333",
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
