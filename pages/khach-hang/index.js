// pages/khach-hang/index.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState([]);

  // Load dữ liệu từ Supabase
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase.from("customers").select("*");

    if (!error && data) {
      setCustomers(data);

      // Lấy danh sách tag duy nhất
      const uniqueTags = [...new Set(data.map((c) => c.tag).filter(Boolean))];
      setTags(uniqueTags);

      // Lấy danh sách nguồn khách duy nhất
      const uniqueSources = [
        ...new Set(data.map((c) => c.source).filter(Boolean)),
      ];
      setSources(uniqueSources);
    }
  }

  const formatCurrency = (value) =>
    Number(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  // XÓA KHÁCH HÀNG
  async function handleDeleteCustomer(id) {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;

    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      console.error("Lỗi xóa khách hàng:", error);
      alert("Xóa khách hàng thất bại. Vui lòng thử lại.");
      return;
    }

    // Load lại danh sách sau khi xóa
    await loadData();
  }

  return (
    <div style={pageWrapper}>
      {/* Header */}
      <div style={headerRow}>
        <div>
          <h1 style={title}>Khách hàng</h1>
          <p style={subtitle}>
            Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
          </p>
        </div>

        <div style={headerActions}>
          <button
            style={outlineButton}
            type="button"
            onClick={() => loadData()}
          >
            Làm mới
          </button>

          <button
            style={primaryButton}
            type="button"
            onClick={() => router.push("/khach-hang/them")}
          >
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Thanh filter */}
      <div style={filterBar}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Tìm theo tên, số điện thoại..."
            style={searchInput}
          />
        </div>

        <div style={filterRight}>
          {/* Dropdown TAG */}
          <select style={filterSelect}>
            <option>Tất cả tag</option>
            {tags.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>

          {/* Dropdown NGUỒN KHÁCH */}
          <select style={filterSelect}>
            <option>Tất cả nguồn khách</option>
            {sources.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bảng khách hàng */}
      <div style={tableCard}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Tên khách</th>
              <th style={th}>Số điện thoại</th>
              <th style={th}>Giới tính</th>
              <th style={th}>Tag</th>
              <th style={th}>Tổng chi tiêu</th>
              <th style={th}>Lần đến</th>
              <th style={th}>Gần nhất</th>
              <th style={th}>Nguồn</th>
              <th style={th}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={tr}>
                <td style={tdName}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={tdSubText}>Sinh nhật: {c.birthday}</div>
                </td>

                <td style={td}>{c.phone}</td>
                <td style={td}>{c.gender}</td>

                <td style={td}>
                  <span style={getTagStyle(c.tag)}>{c.tag}</span>
                </td>

                <td style={td}>{formatCurrency(c.totalSpent || 0)}</td>
                <td style={td}>{c.visits || 0}</td>
                <td style={td}>{c.lastVisit || "-"}</td>
                <td style={td}>{c.source || "-"}</td>

                <td style={td}>
                  <div style={actionsWrapper}>
                    <button style={secondaryButton}>Xem</button>
                    <button
                      style={dangerButton}
                      type="button"
                      onClick={() => handleDeleteCustomer(c.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== STYLE OBJECTS ===== */

const pageWrapper = { padding: 24 };

const title = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  marginBottom: 4,
};

const subtitle = { margin: 0, color: "#6b7280", fontSize: 14 };

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const headerActions = { display: "flex", gap: 8 };

const primaryButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  background: "#f5c451",
  color: "#111827",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(245,196,81,0.35)",
};

const outlineButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#374151",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
};

const secondaryButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  fontSize: 13,
  cursor: "pointer",
};

const dangerButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #fecaca",
  background: "#fee2e2",
  fontSize: 13,
  cursor: "pointer",
  color: "#b91c1c",
};

const filterBar = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 16,
};

const filterRight = { display: "flex", gap: 8 };

const searchInput = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 14,
  background: "#f9fafb",
};

const filterSelect = {
  padding: "9px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  background: "#ffffff",
};

const tableCard = {
  background: "#ffffff",
  borderRadius: 20,
  padding: 20,
  boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const th = {
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: 600,
  borderBottom: "1px solid #f3f4f6",
  background: "#f9fafb",
};

const tr = { borderBottom: "1px solid #f3f4f6" };

const td = { padding: "10px 12px", verticalAlign: "middle" };

const tdName = { ...td };

const tdSubText = {
  fontSize: 12,
  color: "#9ca3af",
  marginTop: 2,
};

const actionsWrapper = {
  display: "flex",
  gap: 8,
};

/* Badge theo tag */
function getTagStyle(tag) {
  const base = {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
  };

  switch (tag) {
    case "VIP":
      return { ...base, background: "rgba(245,196,81,0.18)", color: "#92400e" };
    case "Khách mới":
      return { ...base, background: "rgba(59,130,246,0.08)", color: "#1d4ed8" };
    case "Khách quen":
      return { ...base, background: "rgba(16,185,129,0.10)", color: "#047857" };
    default:
      return { ...base, background: "#f3f4f6", color: "#4b5563" };
  }
}
