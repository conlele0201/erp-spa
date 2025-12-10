import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function KhachHang() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const { data, error } = await supabase.from("customers").select("*");

    if (!error && data) {
      setCustomers(data);
    }
  }

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px" }}>
        Khách hàng
      </h1>

      <p style={{ color: "#444", marginBottom: "20px" }}>
        Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
      </p>

      {/* SEARCH + TAG + NGUỒN + BUTTON */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Tìm theo tên, số điện thoại…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: "40px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          style={{
            padding: "14px 20px",
            borderRadius: "40px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        >
          <option>Tất cả tag</option>
        </select>

        <select
          style={{
            padding: "14px 20px",
            borderRadius: "40px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        >
          <option>Tất cả nguồn khách</option>
        </select>

        <button
          style={{
            padding: "14px 28px",
            background: "#f4b400",
            color: "white",
            border: "none",
            borderRadius: "40px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Thêm khách hàng
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          marginTop: "32px",
          background: "white",
          borderRadius: "20px",
          padding: "0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ background: "#fdecb2", textAlign: "left" }}>
              <th style={thStyle}>Tên khách</th>
              <th style={thStyle}>Số điện thoại</th>
              <th style={thStyle}>Giới tính</th>
              <th style={thStyle}>Tag</th>
              <th style={thStyle}>Tổng chi tiêu</th>
              <th style={thStyle}>Lần đến</th>
              <th style={thStyle}>Gần nhất</th>
              <th style={thStyle}>Nguồn</th>
              <th style={thStyle}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((kh) => (
              <tr key={kh.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>
                  <strong>{kh.name}</strong>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    Sinh nhật: {kh.birthday || "-"}
                  </div>
                </td>
                <td style={tdStyle}>{kh.phone}</td>
                <td style={tdStyle}>{kh.gender}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "6px 14px",
                      background: "#ffefef",
                      borderRadius: "20px",
                      color: "#d66",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {kh.tag || "VIP"}
                  </span>
                </td>
                <td style={tdStyle}>0 đ</td>
                <td style={tdStyle}>0</td>
                <td style={tdStyle}>-</td>
                <td style={tdStyle}>{kh.source}</td>
                <td style={tdStyle}>
                  <button
                    style={{
                      padding: "6px 18px",
                      background: "white",
                      border: "1px solid #ddd",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "18px 20px",
  fontSize: "15px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: "15px",
};
