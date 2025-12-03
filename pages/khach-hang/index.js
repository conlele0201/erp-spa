// pages/khach-hang/index.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterTag, setFilterTag] = useState("Tất cả");

  // Tải dữ liệu thật từ Supabase
  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Lỗi tải khách hàng:", error.message);
        setCustomers([]);
      } else {
        setCustomers(data || []);
      }
      setLoading(false);
    };

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

  const filteredCustomers = customers.filter((c) => {
    const text = (searchText || "").toLowerCase();
    const matchText =
      !text ||
      c.name?.toLowerCase().includes(text) ||
      c.phone?.toLowerCase().includes(text);

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
        background: "#f9f3f6",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#F9D9E4",
          padding: "24px 20px",
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
          {sidebarItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                textDecoration: "none",
                fontWeight: "600",
                color: item.label === "Khách hàng" ? "#000" : "#333",
                background:
                  item.label === "Khách hàng" ? "#EFA6C3" : "transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "24px 32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
          Quản lý khách hàng
        </h1>

        {/* Thanh tìm kiếm + filter + nút thêm */}
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
              background: "#e88aaa",
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

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #eee",
            padding: "0",
          }}
        >
          {loading ? (
            <p style={{ padding: "16px" }}>Đang tải dữ liệu...</p>
          ) : filteredCustomers.length === 0 ? (
            <p style={{ padding: "16px" }}>Chưa có khách hàng nào.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9D9E4" }}>
                  <th style={th}>Tên khách</th>
                  <th style={th}>Số điện thoại</th>
                  <th style={th}>Giới tính</th>
                  <th style={th}>Tag</th>
                  <th style={th}>Tổng chi tiêu</th>
                  <th style={th}>Lần đến</th>
                  <th style={th}>Gần nhất</th>
                  <th style={th}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={td}>{c.name}</td>
                    <td style={td}>{c.phone}</td>
                    <td style={td}>{c.gender}</td>
                    <td style={td}>
                      {c.tag && (
                        <span
                          style={{
                            background: "#F3C1D8",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        >
                          {c.tag}
                        </span>
                      )}
                    </td>
                    <td style={td}>
                      {(c.total_spent || 0).toLocaleString("vi-VN") + "đ"}
                    </td>
                    <td style={td}>{c.visits || 0}</td>
                    <td style={td}>
                      {c.last_visit
                        ? new Date(c.last_visit).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td style={td}>
                      <button
                        style={{
                          padding: "6px 10px",
                          background: "#fff",
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

const th = {
  textAlign: "left",
  padding: "12px",
  fontWeight: "600",
  fontSize: "14px",
};

const td = {
  padding: "12px",
  fontSize: "14px",
};
