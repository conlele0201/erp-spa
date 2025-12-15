import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadCustomers();
    loadTags();
    loadSources();
  }, []);

  /* ================= DATA LOAD ================= */

  async function loadCustomers() {
    const { data } = await supabase
      .from("customers")
      .select(`
        id,
        name,
        phone,
        gender,
        birthday,
        total_spent,
        visits,
        last_visit,
        customer_tags ( id, name ),
        customer_sources ( id, name )
      `)
      .order("id", { ascending: false });

    if (data) {
      setCustomers(data);
      setFilteredCustomers(data);
    }
  }

  async function loadTags() {
    const { data } = await supabase
      .from("customer_tags")
      .select("id, name")
      .order("name");

    setTags(data || []);
  }

  async function loadSources() {
    const { data } = await supabase
      .from("customer_sources")
      .select("id, name")
      .order("name");

    setSources(data || []);
  }

  /* ================= SEARCH ================= */

  function handleSearch(value) {
    setSearchText(value);

    if (!value) {
      setFilteredCustomers(customers);
      return;
    }

    const keyword = value.toLowerCase();

    const result = customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(keyword) ||
        c.phone?.includes(keyword)
    );

    setFilteredCustomers(result);
  }

  /* ================= UI ================= */

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("vi-VN", {
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

      {/* Filter bar */}
      <div style={filterBar}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Tìm theo tên, số điện thoại..."
            style={searchInput}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div style={filterRight}>
          <select style={filterSelect}>
            <option value="">Tất cả tag</option>
            {tags.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
          </select>

          <select style={filterSelect}>
            <option value="">Tất cả nguồn khách</option>
            {sources.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
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
            {filteredCustomers.map((c) => (
              <tr key={c.id} style={tr}>
                <td style={tdName}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={tdSubText}>
                    Sinh nhật: {c.birthday || "-"}
                  </div>
                </td>

                <td style={td}>{c.phone}</td>
                <td style={td}>{c.gender}</td>

                <td style={td}>
                  {c.customer_tags ? (
                    <span style={getTagStyle()}>
                      {c.customer_tags.name}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td style={td}>{formatCurrency(c.total_spent)}</td>
                <td style={td}>{c.visits || 0}</td>
                <td style={td}>{c.last_visit || "-"}</td>
                <td style={td}>{c.customer_sources?.name || "-"}</td>

                {/* THAO TÁC – 3 NÚT 1 HÀNG */}
                <td style={{ ...td, whiteSpace: "nowrap" }}>
                  <button style={secondaryButton}>Xem</button>
                  <button style={secondaryButton}>Sửa</button>
                  <button style={dangerButton}>Xóa</button>
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
  border: "none",
  background: "#f5c451",
  fontWeight: 600,
  cursor: "pointer",
};

const outlineButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#fff",
  marginRight: 6,
};

const dangerButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #fecaca",
  background: "#fee2e2",
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
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "1px solid #f3f4f6",
  background: "#f9fafb",
};

const tr = { borderBottom: "1px solid #f3f4f6" };
const td = { padding: "10px 12px" };
const tdName = { ...td };
const tdSubText = { fontSize: 12, color: "#9ca3af" };

function getTagStyle() {
  return {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    background: "rgba(245,196,81,0.18)",
    color: "#92400e",
    fontWeight: 600,
  };
}
