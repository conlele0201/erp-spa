import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Khách hàng", path: "/khach-hang" },
    { name: "Lịch hẹn", path: "/lich-hen" },
    { name: "Liệu trình", path: "/lieu-trinh" },
    { name: "Kho", path: "/kho" },
    { name: "POS", path: "/pos" },
    { name: "CSKH", path: "/cskh" },
    { name: "Báo cáo", path: "/bao-cao" },
    { name: "Hệ thống", path: "/he-thong" },
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
      {/* LOGO */}
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

      {/* MENU */}
      <nav>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.name;
          return (
            <Link key={item.name} href={item.path} legacyBehavior>
              <a
                onClick={() => setActiveMenu(item.name)}
                style={{
                  width: "100%",
                  display: "block",
                  padding: "14px 25px",
                  fontWeight: isActive ? "600" : "400",
                  cursor: "pointer",
                  background: isActive ? "#e8a8c0" : "transparent",
                  transition: "0.2s",
                  textDecoration: "none",
                  color: "#333",
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#f4c7d9";
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================
   MAIN CONTENT – DASHBOARD
============================= */

function MainContent() {
  // mock data
  const appointments = [
    {
      time: "09:00",
      customer: "Ngọc Anh",
      service: "Chăm sóc da mặt",
      staff: "Linh",
      status: "Đang làm",
    },
    {
      time: "10:30",
      customer: "Thu Trang",
      service: "Giảm béo bụng",
      staff: "Hà",
      status: "Chờ",
    },
    {
      time: "13:00",
      customer: "Trúc Ly",
      service: "Điều trị mụn",
      staff: "Mai",
      status: "Hoàn tất",
    },
  ];

  const rooms = [
    { name: "Phòng 1", status: "Đang sử dụng" },
    { name: "Phòng 2", status: "Trống" },
    { name: "Phòng 3", status: "Đang sử dụng" },
    { name: "Phòng 4", status: "Đang vệ sinh" },
  ];

  const revenue7days = [
    { day: "Hôm nay", amount: "12,5M" },
    { day: "-1 ngày", amount: "9,8M" },
    { day: "-2 ngày", amount: "11,2M" },
    { day: "-3 ngày", amount: "8,4M" },
    { day: "-4 ngày", amount: "10,1M" },
    { day: "-5 ngày", amount: "7,9M" },
    { day: "-6 ngày", amount: "9,3M" },
  ];

  const topServices = [
    { name: "Điều trị mụn chuyên sâu", count: 18 },
    { name: "Chăm sóc da cơ bản", count: 15 },
    { name: "Giảm béo vùng bụng", count: 11 },
  ];

  const careReminders = [
    "Gọi lại khách Thuỷ (sau điều trị 3 ngày)",
    "Nhắc liệu trình lần 3 cho khách Ngọc Hân",
    "Chúc mừng sinh nhật khách Minh Anh",
  ];

  const alerts = [
    "Serum HA còn dưới 5 chai trong kho.",
    "2 khách còn công nợ chưa thanh toán đủ.",
    "3 gói liệu trình sắp hết buổi, cần tư vấn gia hạn.",
  ];

  const shortcuts = [
    "Thêm khách hàng",
    "Tạo lịch hẹn",
    "Bán dịch vụ / gói",
    "Nhập kho nhanh",
  ];

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

      {/* PAGE BODY */}
      <div style={{ padding: "32px" }}>
        {/* A – WELCOME + KPI NHANH */}
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>
          Welcome to ERP SPA
        </h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Trang chủ hiển thị các widget, KPI, lịch hẹn và báo cáo nhanh của spa.
        </p>

        {/* KPI GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {kpiCard("Khách hôm nay", "24")}
          {kpiCard("Doanh thu hôm nay", "12,500,000đ")}
          {kpiCard("Lịch hẹn sắp tới", "8")}
        </div>

        {/* B – LỊCH HẸN & TÌNH TRẠNG PHÒNG */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* B1 – Lịch hẹn hôm nay */}
          <Card title="Lịch hẹn hôm nay">
            {appointments.map((a, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom:
                    idx === appointments.length - 1
                      ? "none"
                      : "1px solid #f1f1f1",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>
                    {a.time} – {a.customer}
                  </div>
                  <div style={{ fontSize: "13px", color: "#777" }}>
                    {a.service} • KT: {a.staff}
                  </div>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    background:
                      a.status === "Đang làm"
                        ? "#d1fae5"
                        : a.status === "Chờ"
                        ? "#fef3c7"
                        : "#e0f2fe",
                  }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </Card>

          {/* B2 – Tình trạng phòng */}
          <Card title="Tình trạng phòng / giường">
            {rooms.map((r, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom:
                    idx === rooms.length - 1 ? "none" : "1px solid #f1f1f1",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: "600" }}>{r.name}</span>
                <span style={{ color: "#555" }}>{r.status}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* C – DOANH THU & TOP DỊCH VỤ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* C1 – Doanh thu 7 ngày gần nhất */}
          <Card title="Doanh thu 7 ngày gần nhất">
            {revenue7days.map((r, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  fontSize: "14px",
                  borderBottom:
                    idx === revenue7days.length - 1
                      ? "none"
                      : "1px solid #f3f3f3",
                }}
              >
                <span>{r.day}</span>
                <span style={{ fontWeight: "600" }}>{r.amount}</span>
              </div>
            ))}
          </Card>

          {/* C2 – Top dịch vụ 7 ngày qua */}
          <Card title="Top dịch vụ 7 ngày qua">
            {topServices.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  fontSize: "14px",
                  borderBottom:
                    idx === topServices.length - 1
                      ? "none"
                      : "1px solid #f3f3f3",
                }}
              >
                <span>
                  {idx + 1}. {s.name}
                </span>
                <span style={{ fontWeight: "600" }}>{s.count} lượt</span>
              </div>
            ))}
          </Card>
        </div>

        {/* D – CSKH & CẢNH BÁO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1.5fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* D1 – Nhắc CSKH */}
          <Card title="Nhắc CSKH hôm nay">
            <ul style={{ paddingLeft: "18px", margin: 0, color: "#555" }}>
              {careReminders.map((c, idx) => (
                <li key={idx} style={{ marginBottom: "6px", fontSize: "14px" }}>
                  {c}
                </li>
              ))}
            </ul>
          </Card>

          {/* D2 – Cảnh báo & thông báo */}
          <Card title="Cảnh báo & thông báo">
            <ul style={{ paddingLeft: "18px", margin: 0, color: "#b91c1c" }}>
              {alerts.map((a, idx) => (
                <li key={idx} style={{ marginBottom: "6px", fontSize: "14px" }}>
                  {a}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* E – SHORTCUT HÀNH ĐỘNG NHANH */}
        <Card title="Thao tác nhanh">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {shortcuts.map((s, idx) => (
              <button
                key={idx}
                style={{
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================
   REUSABLE COMPONENTS
============================= */

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px 20px 18px 20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: "12px",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function kpiCard(title, value) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "22px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ margin: 0, color: "#777" }}>{title}</p>
      <h2 style={{ marginTop: "12px", fontSize: "24px", fontWeight: "700" }}>
        {value}
      </h2>
    </div>
  );
}
