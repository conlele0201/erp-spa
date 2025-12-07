// pages/khach-hang/index.js

import { useRouter } from "next/router";

export default function KhachHangPage() {
  const router = useRouter();

  // Mock data tạm thời cho layout – sau sẽ nối Supabase
  const customers = [
    {
      id: 1,
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      tag: "VIP",
      totalSpent: 12500000,
      visits: 8,
      lastVisit: "02/12/2025",
      birthday: "12/10",
      source: "Facebook",
    },
    {
      id: 2,
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      tag: "Khách mới",
      totalSpent: 4200000,
      visits: 1,
      lastVisit: "28/11/2025",
      birthday: "05/08",
      source: "TikTok",
    },
    {
      id: 3,
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      tag: "Khách quen",
      totalSpent: 7800000,
      visits: 5,
      lastVisit: "25/11/2025",
      birthday: "30/04",
      source: "Giới thiệu",
    },
  ];

  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div style={pageWrapper}>
      {/* Tiêu đề + thanh công cụ trên cùng */}
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
            onClick={() => router.push("/khach-hang")}
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

      {/* Thanh filter: tìm kiếm + lọc tag + nguồn khách */}
      <div style={filterBar}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Tìm theo tên, số điện thoại..."
            style={searchInput}
          />
        </div>

        <div style={filterRight}>
          <select style={filterSelect}>
            <option>Tất cả tag</option>
            <option>VIP</option>
            <option>Khách mới</option>
            <option>Khách quen</option>
            <option>Khách tiềm năng</option>
          </select>

          <select style={filterSelect}>
            <option>Tất cả nguồn khách</option>
            <option>Facebook</option>
            <option>TikTok</option>
            <option>Zalo</option>
            <option>Đi ngang qua</option>
            <option>Giới thiệu</option>
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
                <td style={td}>{formatCurrency(c.totalSpent)}</td>
                <td style={td}>{c.visits}</td>
                <td style={td}>{c.lastVisit}</td>
                <td style={td}>{c.source}</td>
                <td style={td}>
                  <button
                    type="button"
                    style={secondaryButton}
                    onClick={() => alert("Sau này sẽ mở trang chi tiết khách.")}
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

/* ===== STYLE OBJECTS ===== */

const pageWrapper = {
  padding: 24,
};

const title = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  marginBottom: 4,
};

const subtitle = {
  margin: 0,
  color: "#6b7280",
  fontSize: 14,
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const headerActions = {
  display: "flex",
  gap: 8,
};

const primaryButton = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  background: "#f5c451", // vàng nhạt
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

const filterBar = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 16,
};

const filterRight = {
  display: "flex",
  gap: 8,
};

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

const tr = {
  borderBottom: "1px solid #f3f4f6",
};

const td = {
  padding: "10px 12px",
  verticalAlign: "middle",
};

const tdName = {
  ...td,
};

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
      return {
        ...base,
        background: "rgba(245,196,81,0.18)",
        color: "#92400e",
      };
    case "Khách mới":
      return {
        ...base,
        background: "rgba(59,130,246,0.08)",
        color: "#1d4ed8",
      };
    case "Khách quen":
      return {
        ...base,
        background: "rgba(16,185,129,0.10)",
        color: "#047857",
      };
    default:
      return {
        ...base,
        background: "#f3f4f6",
        color: "#4b5563",
      };
  }
}
