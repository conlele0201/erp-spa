// pages/khach-hang/index.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase.from("customers").select("*");

    if (!error && data) {
      setCustomers(data);

      const uniqueTags = [...new Set(data.map((c) => c.tag).filter(Boolean))];
      setTags(uniqueTags);

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
          <button style={outlineButton} onClick={() => loadData()}>
            Làm mới
          </button>

          <button
            style={primaryButton}
            onClick={() => router.push("/khach-hang/them")}
          >
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Filter */}
      <div style={filterBar}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Tìm theo tên, số điện thoại..."
            style={searchInput}
          />
        </div>

        <div style={filterRight}>
          {/* DROPDOWN TAG - chỉ thêm option cố định, không sửa map */}
          <select style={filterSelect}>
            <option>Tất cả tag</option>

            {/* OPTION CỐ ĐỊNH — YÊU CẦU CỦA ANH */}
            <option>VIP</option>
            <option>Khách mới</option>
            <option>Khách quen</option>
            <option>Khách tiềm năng</option>

            {/* OPTION LOAD TỪ DATABASE */}
            {tags.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>

          {/* DROPDOWN NGUỒN KHÁCH */}
          <select style={filterSelect}>
            <option>Tất cả nguồn khách</option>

            {/* OPTION CỐ ĐỊNH */}
            <option>Facebook</option>
            <option>TikTok</option>
            <option>Zalo</option>
            <option>Google</option>
            <option>Giới thiệu</option>
            <option>Đi ngang qua</option>

            {/* OPTION LOAD TỪ DATABASE */}
            {sources.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
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
                  <button style={secondaryButton}>Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==== STYLE — KHÔNG ĐỤNG MỘT CHỮ ==== */

const pageWrapper = { padding: 24 };
const title = { fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 4 };
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
  background: "#f5c451",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};
const outlineButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#fff",
};
const filterBar = { display: "flex", alignItems: "center", gap: 16, marginBottom: 16 };
const filterRight = { display: "flex", gap: 8 };
const searchInput = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
};
const filterSelect = {
  padding: "9px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
};
const tableCard = {
  background: "#fff",
  borderRadius: 20,
  padding: 20,
  boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
};
const table = { width: "100%", borderCollapse: "collapse" };
const th = {
  padding: "10px 12px",
  background: "#f9fafb",
  borderBottom: "1px solid #f3f4f6",
  textAlign: "left",
  fontWeight: 600,
};
const tr = { borderBottom: "1px solid #f3f4f6" };
const td = { padding: "10px 12px" };
const tdName = { ...td };
const tdSubText = { fontSize: 12, color: "#9ca3af" };

function getTagStyle(tag) {
  const base = {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
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
