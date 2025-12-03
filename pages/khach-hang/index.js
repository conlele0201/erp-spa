// pages/khach-hang/index.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tải dữ liệu thật từ Supabase
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCustomers(data || []);

    setLoading(false);
  };

  const goTo = (path) => {
    window.location.href = path;
  };

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
          {[
            { label: "Dashboard", link: "/" },
            { label: "Khách hàng", link: "/khach-hang" },
            { label: "Lịch hẹn", link: "#" },
            { label: "Liệu trình", link: "#" },
            { label: "Kho", link: "#" },
            { label: "POS", link: "#" },
            { label: "CSKH", link: "#" },
            { label: "Báo cáo", link: "#" },
          ].map((item, idx) => (
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

      {/* MAIN AREA */}
      <div style={{ flex: 1, padding: "24px 32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
          Quản lý khách hàng
        </h1>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #eee",
            padding: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Danh sách khách hàng</strong>

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
              onClick={() => alert("Thêm khách sẽ làm bước tiếp")}
            >
              + Thêm khách hàng
            </button>
          </div>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : customers.length === 0 ? (
            <p>Chưa có khách hàng nào.</p>
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
                {customers.map((c) => (
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
