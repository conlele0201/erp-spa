import React, { useState } from "react";

export default function KhachHangPage() {
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("Tất cả");

  // Mock data khách hàng
  const customers = [
    {
      id: 1,
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      totalSpent: "12,500,000đ",
      visits: 8,
      lastVisit: "02/12/2025",
      tag: "VIP",
    },
    {
      id: 2,
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      totalSpent: "4,200,000đ",
      visits: 3,
      lastVisit: "28/11/2025",
      tag: "Khách mới",
    },
    {
      id: 3,
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      totalSpent: "7,800,000đ",
      visits: 5,
      lastVisit: "25/11/2025",
      tag: "Khách quen",
    },
  ];

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);

    const matchGender =
      filterGender === "Tất cả" || c.gender === filterGender;

    return matchSearch && matchGender;
  });

  return (
    <div style={{ padding: "32px", fontFamily: "Arial" }}>
      {/* HEADER */}
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Quản lý khách hàng
      </h1>

      {/* ACTION BAR */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            width: "280px",
          }}
        />

        {/* Filter giới tính */}
        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <option>Tất cả</option>
          <option>Nam</option>
          <option>Nữ</option>
        </select>

        {/* Button thêm khách */}
        <button
          style={{
            marginLeft: "auto",
            padding: "12px 20px",
            background: "#e8a8c0",
            border: "none",
            borderRadius: "8px",
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
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #eee",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9f1f4", textAlign: "left" }}>
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
            {filtered.map((c) => (
              <tr
                key={c.id}
                style={{
                  borderBottom: "1px solid #eee",
                  height: "52px",
                }}
              >
                <td style={td}>{c.name}</td>
                <td style={td}>{c.phone}</td>
                <td style={td}>{c.gender}</td>
                <td style={td}>
                  <span
                    style={{
                      padding: "4px 10px",
                      background: "#ffe4ec",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    {c.tag}
                  </span>
                </td>
                <td style={td}>{c.totalSpent}</td>
                <td style={td}>{c.visits}</td>
                <td style={td}>{c.lastVisit}</td>
                <td style={td}>
                  <button
                    onClick={() => alert("Xem hồ sơ khách: " + c.name)}
                    style={{
                      padding: "6px 12px",
                      background: "#f3f3f3",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Không tìm thấy khách hàng phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* STYLE */
const th = {
  padding: "12px 10px",
  fontSize: "14px",
  fontWeight: "600",
  borderBottom: "1px solid #eee",
};

const td = {
  padding: "10px 10px",
  fontSize: "14px",
};
