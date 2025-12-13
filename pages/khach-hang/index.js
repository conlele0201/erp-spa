import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    loadCustomers();
    loadTags();
    loadSources();
  }, []);

  /* ================= LOAD DATA ================= */

  async function loadCustomers() {
    const { data } = await supabase
      .from("customers")
      .select(`
        id,
        name,
        phone,
        gender,
        totalSpent,
        visits,
        lastVisit,
        birthday,
        customer_tags(name),
        customer_sources(name)
      `)
      .order("id", { ascending: false });

    if (data) setCustomers(data);
  }

  async function loadTags() {
    const { data } = await supabase
      .from("customer_tags")
      .select("id, name")
      .order("name");

    if (data) setTags(data);
  }

  async function loadSources() {
    const { data } = await supabase
      .from("customer_sources")
      .select("id, name")
      .order("name");

    if (data) setSources(data);
  }

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  /* ================= RENDER ================= */

  return (
    <div style={pageWrapper}>
      {/* HEADER */}
      <div style={headerRow}>
        <div>
          <h1 style={title}>Khách hàng</h1>
          <p style={subtitle}>
            Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
          </p>
        </div>

        <div style={headerActions}>
          <button style={outlineButton} onClick={loadCustomers}>
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

      {/* FILTER BAR */}
      <div style={filterBar}>
        <input
          placeholder="Tìm theo tên, số điện thoại..."
          style={searchInput}
        />

        <select style={filterSelect}>
          <option value="">Tất cả tag</option>
          {tags.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select style={filterSelect}>
          <option value="">Tất cả nguồn khách</option>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div style={tableCard}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Tên khách</th>
              <th style={th}>SĐT</th>
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
                  <strong>{c.name}</strong>
                  <div style={tdSubText}>Sinh nhật: {c.birthday || "-"}</div>
                </td>
                <td style={td}>{c.phone}</td>
                <td style={td}>{c.gender}</td>
                <td style={td}>
                  <span style={getTagStyle(c.customer_tags?.name)}>
                    {c.customer_tags?.name || "-"}
                  </span>
                </td>
                <td style={td}>{formatCurrency(c.totalSpent)}</td>
                <td style={td}>{c.visits || 0}</td>
                <td style={td}>{c.lastVisit || "-"}</td>
                <td style={td}>{c.customer_sources?.name || "-"}</td>
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

/* ================= STYLES (GIỮ NGUYÊN) ================= */

const pageWrapper = { padding: 24 };
const title = { fontSize: 28, fontWeight: 700, marginBottom: 4 };
const subtitle = { color: "#6b7280", fontSize: 14 };

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
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

const filterBar = {
  display: "flex",
  gap: 12,
  marginBottom: 16,
};

const searchInput = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
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
const th = { padding: "10px 12px", borderBottom: "1px solid #eee" };
const tr = { borderBottom: "1px solid #f3f4f6" };
const td = { padding: "10px 12px" };
const tdName = { ...td };
const tdSubText = { fontSize: 12, color: "#9ca3af" };

const secondaryButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
};

function getTagStyle(tag) {
  return {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    background: "#f3f4f6",
  };
}
