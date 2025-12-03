// pages/khach-hang/index.js

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy dữ liệu từ bảng "customers" trên Supabase
  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("customers")
        .select(
          `
          id,
          name,
          phone,
          gender,
          tag,
          total_spent,
          visits,
          last_visit
        `
        )
        .order("last_visit", { ascending: false });

      if (error) {
        console.error("Lỗi lấy dữ liệu khách hàng:", error);
        setError("Không tải được dữ liệu khách hàng.");
        setCustomers([]);
      } else {
        setCustomers(data || []);
      }

      setLoading(false);
    }

    fetchCustomers();
  }, []);

  // Lọc + tìm kiếm trên data đã lấy
  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search);
    const matchTag = filterTag === "Tất cả" || c.tag === filterTag;
    return matchSearch && matchTag;
  });

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Quản lý khách hàng</h1>

      {/* Thanh tìm kiếm + Filter + nút thêm */}
      <div style={styles.toolbar}>
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={styles.select}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="VIP">VIP</option>
          <option value="Khách mới">Khách mới</option>
          <option value="Khách quen">Khách quen</option>
        </select>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => {
            // Sau này mình sẽ mở modal "Thêm khách hàng" ở đây
            alert("Chức năng thêm khách hàng sẽ làm ở bước sau.");
          }}
        >
          + Thêm khách hàng
        </button>
      </div>

      {/* Thông báo loading / lỗi */}
      {loading && <p style={styles.infoText}>Đang tải dữ liệu khách hàng…</p>}
      {!loading && error && (
        <p style={{ ...styles.infoText, color: "#E53935" }}>{error}</p>
      )}

      {/* Bảng khách hàng */}
      {!loading && !error && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tên khách</th>
                <th style={styles.th}>Số điện thoại</th>
                <th style={styles.th}>Giới tính</th>
                <th style={styles.th}>Tag</th>
                <th style={styles.th}>Tổng chi tiêu</th>
                <th style={styles.th}>Lần đến</th>
                <th style={styles.th}>Gần nhất</th>
                <th style={styles.th}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td style={styles.emptyCell} colSpan={8}>
                    Không có khách hàng phù hợp.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td style={styles.td}>{c.name}</td>
                    <td style={styles.td}>{c.phone}</td>
                    <td style={styles.td}>{c.gender}</td>
                    <td style={styles.td}>
                      <span style={styles.tagBadge}>{c.tag}</span>
                    </td>
                    <td style={styles.td}>
                      {c.total_spent != null
                        ? c.total_spent.toLocaleString("vi-VN") + "đ"
                        : "-"}
                    </td>
                    <td style={styles.td}>{c.visits ?? "-"}</td>
                    <td style={styles.td}>{c.last_visit ?? "-"}</td>
                    <td style={styles.td}>
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => {
                          // Sau này sẽ mở trang / modal chi tiết khách
                          alert(`Xem chi tiết khách: ${c.name}`);
                        }}
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** CSS inline đơn giản, giữ đúng style spa hồng */
const styles = {
  pageContainer: {
    padding: "32px 40px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
  },
  toolbar: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #e0e0e0",
    outline: "none",
    fontSize: "14px",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
  primaryButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#f48fb1",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  tableWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    padding: "8px 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    padding: "12px 20px",
    fontWeight: 600,
    backgroundColor: "#ffe4ef",
    borderBottom: "1px solid #f1f1f1",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 20px",
    borderBottom: "1px solid #f7f7f7",
    verticalAlign: "middle",
  },
  emptyCell: {
    padding: "16px 20px",
    textAlign: "center",
    color: "#757575",
  },
  tagBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#ffd1e3",
    color: "#ad1457",
    fontSize: "12px",
    fontWeight: 600,
  },
  secondaryButton: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },
  infoText: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 14,
    color: "#555",
  },
};
