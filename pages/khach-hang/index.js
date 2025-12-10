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

  // Load dữ liệu từ Supabase
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Lỗi load customers:", error);
      return;
    }

    if (data) {
      setCustomers(data);
      // mặc định hiển thị tất cả
      setFilteredCustomers(data);

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

  // Hàm filter chung
  function applyFilter(
    list,
    {
      search = searchText,
      tag = tagFilter,
      source = sourceFilter,
    }: {
      search?: string;
      tag?: string;
      source?: string;
    } = {}
  ) {
    let result = [...list];

    // filter theo search (tên + sđt)
    if (search.trim() !== "") {
      const keyword = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(keyword)) ||
          (c.phone && c.phone.toLowerCase().includes(keyword))
      );
    }

    // filter theo tag
    if (tag !== "all") {
      result = result.filter((c) => c.tag === tag);
    }

    // filter theo nguồn khách
    if (source !== "all") {
      result = result.filter((c) => c.source === source);
    }

    setFilteredCustomers(result);
  }

  // --- handlers cho search & filter ---

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchText(value);
    applyFilter(customers, {
      search: value,
      tag: tagFilter,
      source: sourceFilter,
    });
  }

  function handleTagChange(e) {
    const value = e.target.value;
    setTagFilter(value);
    applyFilter(customers, {
      search: searchText,
      tag: value,
      source: sourceFilter,
    });
  }

  function handleSourceChange(e) {
    const value = e.target.value;
    setSourceFilter(value);
    applyFilter(customers, {
      search: searchText,
      tag: tagFilter,
      source: value,
    });
  }

  // --- XÓA KHÁCH HÀNG (Bước 1) ---

  async function handleDelete(id) {
    if (!window.confirm("Anh có chắc muốn xóa khách hàng này không?")) return;

    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      console.error("Lỗi xóa khách hàng:", error);
      alert("Xóa khách hàng thất bại, anh thử lại sau nhé.");
      return;
    }

    // load lại danh sách sau khi xóa
    await loadData();
    // reset filter (nếu muốn giữ filter thì bỏ 3 dòng dưới)
    setSearchText("");
    setTagFilter("all");
    setSourceFilter("all");
  }

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
          <button
            style={outlineButton}
            type="button"
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
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        <div style={filterRight}>
          {/* Dropdown TAG */}
          <select
            style={filterSelect}
            value={tagFilter}
            onChange={handleTagChange}
          >
            <option value="all">Tất cả tag</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Dropdown NGUỒN KHÁCH */}
          <select
            style={filterSelect}
            value={sourceFilter}
            onChange={handleSourceChange}
          >
            <option value="all">Tất cả nguồn khách</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
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
            {filteredCustomers.map((c) => (
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

                <td style={td}>{formatCurrency(c.totalSpent)}</td>
                <td style={td}>{c.visits || 0}</td>
                <td style={td}>{c.lastVisit || "-"}</td>
                <td style={td}>{c.source || "-"}</td>

                <td style={td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={secondaryButton}
                      type="button"
                      onClick={() =>
                        alert("Sau này sẽ mở trang chi tiết / sửa khách hàng.")
                      }
                    >
                      Xem
                    </button>
                    <button
                      style={dangerButton}
                      type="button"
                      onClick={() => handleDelete(c.id)}
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
