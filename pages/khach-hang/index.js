// pages/khach-hang/index.js
import Link from "next/link";

export default function KhachHangPage() {
  const customers = [
    {
      id: 1,
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      tag: "VIP",
      total: "12,500,000đ",
      visits: 8,
      last: "02/12/2025",
    },
    {
      id: 2,
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      tag: "Khách mới",
      total: "4,200,000đ",
      visits: 3,
      last: "28/11/2025",
    },
    {
      id: 3,
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      tag: "Khách quen",
      total: "7,800,000đ",
      visits: 5,
      last: "25/11/2025",
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Quản lý khách hàng
      </h1>

      {/* Thanh công cụ */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <input
          placeholder="Tìm theo tên hoặc số điện thoại..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid #ddd",
            outline: "none",
            fontSize: 14,
          }}
        />
        <select
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid #ddd",
            fontSize: 14,
          }}
        >
          <option>Tất cả</option>
          <option>VIP</option>
          <option>Khách mới</option>
          <option>Khách quen</option>
        </select>

        {/* Nút điều hướng tới /khach-hang/them */}
        <Link
          href="/khach-hang/them"
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "none",
            background: "#f973b4",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          + Thêm khách hàng
        </Link>
      </div>

      {/* Bảng khách hàng */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr style={{ background: "#ffe2ee" }}>
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
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "#ffd6e8",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {c.tag}
                  </span>
                </td>
                <td style={td}>{c.total}</td>
                <td style={td}>{c.visits}</td>
                <td style={td}>{c.last}</td>
                <td style={td}>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: 13,
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

const th = {
  padding: "10px 12px",
  textAlign: "left",
  fontWeight: 600,
};

const td = {
  padding: "10px 12px",
};
