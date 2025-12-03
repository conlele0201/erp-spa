// pages/khach-hang/index.js
import React from "react";
import Link from "next/link";

export default function KhachHangPage() {
  const customers = [
    {
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      tag: "VIP",
      totalSpend: "12,500,000đ",
      visits: 8,
      lastVisit: "02/12/2025",
    },
    {
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      tag: "Khách mới",
      totalSpend: "4,200,000đ",
      visits: 3,
      lastVisit: "28/11/2025",
    },
    {
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      tag: "Khách quen",
      totalSpend: "7,800,000đ",
      visits: 5,
      lastVisit: "25/11/2025",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f7f7fb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* SIDEBAR CỐ ĐỊNH – giống Dashboard */}
      <div
        style={{
          width: "260px",
          backgroundColor: "#f8c6d1",
          padding: "24px 20px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "140px",
              height: "140px",
              backgroundColor: "#f4b6c2",
              borderRadius: "10px",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: "10px", fontWeight: 600 }}>SPA LOGO</p>
        </div>

        {/* Menu */}
        <div>
          <Link href="/">
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "6px",
                marginBottom: "6px",
                cursor: "pointer",
                fontWeight: 500,
                backgroundColor: "transparent",
              }}
            >
              Dashboard
            </div>
          </Link>

          <Link href="/khach-hang">
            <div
              style={{
                padding: "12px 18px",
                borderRadius: "6px",
                marginBottom: "6px",
                cursor: "pointer",
                fontWeight: 500,
                backgroundColor: "#e79bb5", // đang chọn Khách hàng
              }}
            >
              Khách hàng
            </div>
          </Link>

          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            Lịch hẹn
          </div>
          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            Liệu trình
          </div>
          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            Kho
          </div>
          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            POS
          </div>
          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            CSKH
          </div>
          <div style={{ padding: "12px 18px", borderRadius: "6px", marginBottom: "6px" }}>
            Báo cáo
          </div>
        </div>
      </div>

      {/* NỘI DUNG BÊN PHẢI – trang Khách hàng */}
      <div style={{ flex: 1, padding: "32px 48px" }}>
        {/* Tiêu đề */}
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px" }}>
          Quản lý khách hàng
        </h1>

        {/* Thanh tìm kiếm + filter + nút thêm */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <input
            type="text"
            placeholder="Tìm theo tên hoặc số điện thoại..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid #e0e0e0",
              outline: "none",
            }}
          />
          <select
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid #e0e0e0",
              outline: "none",
            }}
          >
            <option>Tất cả</option>
            <option>VIP</option>
            <option>Khách mới</option>
            <option>Khách quen</option>
          </select>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#ff6f91",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* Bảng khách hàng */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 12px 25px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Header bảng */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "2fr 1.5fr 1fr 1.2fr 1.5fr 1fr 1.2fr 0.8fr",
              padding: "12px 20px",
              backgroundColor: "#ffe1ea",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <div>Tên khách</div>
            <div>Số điện thoại</div>
            <div>Giới tính</div>
            <div>Tag</div>
            <div>Tổng chi tiêu</div>
            <div>Lần đến</div>
            <div>Gần nhất</div>
            <div>Thao tác</div>
          </div>

          {/* Dòng dữ liệu */}
          {customers.map((c, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 1.5fr 1fr 1.2fr 1.5fr 1fr 1.2fr 0.8fr",
                padding: "12px 20px",
                borderTop: "1px solid #f1f1f1",
                fontSize: "14px",
                alignItems: "center",
              }}
            >
              <div>{c.name}</div>
              <div>{c.phone}</div>
              <div>{c.gender}</div>
              <div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    backgroundColor: "#ffe1ea",
                    color: "#b23b5d",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <div>{c.totalSpend}</div>
              <div>{c.visits}</div>
              <div>{c.lastVisit}</div>
              <div>
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Xem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
