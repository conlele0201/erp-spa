// pages/khach-hang/index.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Data mẫu fallback nếu Supabase lỗi / chưa có dữ liệu
const mockCustomers = [
  {
    id: 1,
    name: "Ngọc Anh",
    phone: "0901234567",
    gender: "Nữ",
    tag: "VIP",
    total_spent: 12500000,
    visits: 8,
    last_visit: "2025-12-02",
  },
  {
    id: 2,
    name: "Minh Khoa",
    phone: "0938765432",
    gender: "Nam",
    tag: "Khách mới",
    total_spent: 4200000,
    visits: 3,
    last_visit: "2025-11-28",
  },
  {
    id: 3,
    name: "Thu Hà",
    phone: "0912345789",
    gender: "Nữ",
    tag: "Khách quen",
    total_spent: 7800000,
    visits: 5,
    last_visit: "2025-11-25",
  },
];

export default function KhachHangPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterTag, setFilterTag] = useState("Tất cả");

  // Lấy dữ liệu thật từ Supabase
  useEffect(() => {
    async function loadCustomers() {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Lỗi Supabase:", error.message);
          setCustomers(mockCustomers);
        } else if (data && data.length > 0) {
          setCustomers(data);
        } else {
          // Không có dữ liệu thì dùng mock
          setCustomers(mockCustomers);
        }
      } catch (err) {
        console.error("Lỗi không xác định:", err);
        setCustomers(mockCustomers);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const sidebarItems = [
    { label: "Dashboard", link: "/" },
    { label: "Khách hàng", link: "/khach-hang" },
    { label: "Lịch hẹn", link: "#" },
    { label: "Liệu trình", link: "#" },
    { label: "Kho", link: "#" },
    { label: "POS", link: "#" },
    { label: "CSKH", link: "#" },
    { label: "Báo cáo", link: "#" },
  ];

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredCustomers = customers.filter((c) => {
    const matchText =
      !normalizedSearch ||
      (c.name && c.name.toLowerCase().includes(normalizedSearch)) ||
      (c.phone && c.phone.toLowerCase().includes(normalizedSearch));

    const matchTag =
      filterTag === "Tất cả" ||
      (c.tag && c.tag.toLowerCase() === filterTag.toLowerCase());

    return matchText && matchTag;
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f3f6",
      }}
    >
      {/* SIDEBAR CỐ ĐỊNH */}
      <div
        style={{
          width: "260px",
          backgroundColor: "#F9D9E4",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            backgroundColor: "#F3C1D8",
            borderRadius: "10px",
            margin: "0 auto",
          }}
        ></div>

        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          SPA LOGO
        </p>

        <div style={{ marginTop: "30px" }}>
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                textDecoration: "none",
                fontWeight: "600",
                color: item.label === "Khách hàng" ? "#000" : "#333",
                backgroundColor:
                  item.label === "Khách hàng" ? "#EFA6C3" : "transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "24px 32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Quản lý khách hàng
        </h1>

        {/* Tìm kiếm + Lọc + Thêm */}
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Tìm theo tên hoặc số điện thoại..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="VIP">VIP</option>
            <option value="Khách mới">Khách mới</option>
            <option value="Khách quen">Khách quen</option>
          </select>

          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#e88aaa",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => alert("Form thêm khách sẽ làm ở bước sau")}
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* BẢNG KHÁCH HÀNG */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #eee",
          }}
        >
          {loading ? (
            <p style={{ padding: "16px" }}>Đang tải dữ liệu...</p>
          ) : filteredCustomers.length === 0 ? (
            <p style={{ padding: "16px" }}>Chưa có khách hàng nào.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F9D9E4" }}>
                  <th style={thStyle}>Tên khách</th>
                  <th style={thStyle}>Số điện thoại</th>
                  <th style={thStyle}>Giới tính</th>
                  <th style={thStyle}>Tag</th>
                  <th style={thStyle}>Tổng chi tiêu</th>
                  <th style={thStyle}>Lần đến</th>
                  <th style={thStyle}>Gần nhất</th>
                  <th style={thStyle}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>{c.name}</td>
                    <td style={tdStyle}>{c.phone}</td>
                    <td style={tdStyle}>{c.gender}</td>
                    <td style={tdStyle}>
                      {c.tag && (
                        <span
                          style={{
                            backgroundColor: "#F3C1D8",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        >
                          {c.tag}
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {(c.total_spent || 0).toLocaleString("vi-VN") + "đ"}
                    </td>
                    <td style={tdStyle}>{c.visits || 0}</td>
                    <td style={tdStyle}>
                      {c.last_visit
                        ? new Date(c.last_visit).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          border: "1px solid #aaa",
                          cursor: "pointer",
                        }}
                        onClick={() => alert(`Xem khách: ${c.name}`)}
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontWeight: 600,
};

const tdStyle = {
  padding: "12px",
};
