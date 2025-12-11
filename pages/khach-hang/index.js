// pages/khach-hang/index.js

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
  const [tagFilter, setTagFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Load dữ liệu từ DB
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCustomers(data);
    setFilteredCustomers(data);

    // lấy tag duy nhất
    setTags([...new Set(data.map((c) => c.tag).filter(Boolean))]);

    // lấy nguồn duy nhất
    setSources([...new Set(data.map((c) => c.source).filter(Boolean))]);
  }

  // APPLY FILTER
  function applyFilter(list, search = searchText, tag = tagFilter, source = sourceFilter) {
    let result = [...list];

    // tìm theo tên / số điện thoại
    if (search.trim() !== "") {
      const kw = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(kw)) ||
          (c.phone && c.phone.toLowerCase().includes(kw))
      );
    }

    if (tag !== "all") result = result.filter((c) => c.tag === tag);
    if (source !== "all") result = result.filter((c) => c.source === source);

    setFilteredCustomers(result);
  }

  // handler search
  function handleSearchChange(e) {
    const v = e.target.value;
    setSearchText(v);
    applyFilter(customers, v, tagFilter, sourceFilter);
  }

  function handleTagChange(e) {
    const v = e.target.value;
    setTagFilter(v);
    applyFilter(customers, searchText, v, sourceFilter);
  }

  function handleSourceChange(e) {
    const v = e.target.value;
    setSourceFilter(v);
    applyFilter(customers, searchText, tagFilter, v);
  }

  // XÓA KHÁCH
  async function handleDelete(id) {
    if (!window.confirm("Anh chắc muốn xóa khách này?")) return;

    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) {
      alert("Xóa thất bại");
      return;
    }

    loadData();
  }

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  // ===== UI =====
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
          <button
            style={outlineButton}
            onClick={() => {
              setSearchText("");
              setTagFilter("all");
              setSourceFilter("all");
              loadData();
            }}
          >
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
        <div style={{ flex: 1 }}>
          <input
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Tìm theo tên, số điện thoại..."
            style={searchInput}
          />
        </div>

        <div style={filterRight}>
          <select style={filterSelect} value={tagFilter} onChange={handleTagChange}>
            <option value="all">Tất cả tag</option>
            {tags.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            style={filterSelect}
            value={sourceFilter}
            onChange={handleSourceChange}
          >
            <option value="all">Tất cả nguồn khách</option>
            {sources.map((s) => (
              <option key={s}>{s}</option>
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
            {filteredCustomers.map((c) => (
              <tr key={c.id} style={tr}>
                <td style={tdName}>
                  <b>{c.name}</b>
                  <div style={tdSubText}>Sinh nhật: {c.birthday}</div>
                </td>
                <td style={td}>{c.phone}</td>
                <td style={td}>{c.gender}</td>

                <td style={td}>
                  <span style={getTagStyle(c.tag)}>{c.tag}</span>
                </td>

                <td style={td}>{formatCurrency(c.totalSpent)}</td>
                <td style={td}>{c.visits || 0}</td>
                <td style={td}>{c.lastVisit || "-"}</td>
                <td style={td}>{c.source || "-"}</td>

                <td style={td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={secondaryButton}
                      onClick={() => alert("Trang chi tiết / sửa sẽ làm bước sau")}
                    >
                      Xem
                    </button>

                    <button style={dangerButton} onClick={() => handleDelete(c.id)}>
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

/* ===== STYLES ===== */

const pageWrapper = { padding: 24 };

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const title = { fontSize: 28, fontWeight: 700, margin: 0 };
const subtitle = { color: "#6b7280", fontSize: 14, margin: 0 };

const headerActions = { display: "flex", gap: 8 };

const primaryButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  background: "#f5c451",
  color: "#111",
  fontWeight: 600,
  cursor: "pointer",
};

const outlineButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const dangerButton = {
  padding: "6px 14px",
  borderRadius: 999,
  border: "1px solid #fca5a5",
  background: "#fee2e2",
  color: "#b91c1c",
  cursor: "pointer",
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
  border: "1px solid #ddd",
  background: "#f9fafb",
};

const filterSelect = {
  padding: "9px 14px",
  borderRadius: 999,
  border: "1px solid #ddd",
};

const tableCard = {
  background: "#fff",
  borderRadius: 20,
  padding: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
};

const table = { width: "100%", borderCollapse: "collapse" };

const th = {
  textAlign: "left",
  padding: "10px 12px",
  background: "#f9fafb",
  borderBottom: "1px solid #eee",
};

const tr = { borderBottom: "1px solid #f3f4f6" };
const td = { padding: "10px 12px" };

const tdName = { ...td };
const tdSubText = { fontSize: 12, color: "#999" };

function getTagStyle(tag) {
  const base = {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  };

  switch (tag) {
    case "VIP":
      return { ...base, background: "#fef3c7", color: "#92400e" };
    case "Khách mới":
      return { ...base, background: "#dbeafe", color: "#1e40af" };
    case "Khách quen":
      return { ...base, background: "#d1fae5", color: "#065f46" };
    default:
      return { ...base, background: "#f3f4f6", color: "#4b5563" };
  }
}
