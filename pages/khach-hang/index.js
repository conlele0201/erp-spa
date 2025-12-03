export default function KhachHangPage() {
  const customers = [
    {
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      tag: "VIP",
      totalSpent: "12,500,000đ",
      visits: 8,
      lastVisit: "02/12/2025",
    },
    {
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      tag: "Khách mới",
      totalSpent: "4,200,000đ",
      visits: 3,
      lastVisit: "28/11/2025",
    },
    {
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      tag: "Khách quen",
      totalSpent: "7,800,000đ",
      visits: 5,
      lastVisit: "25/11/2025",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f7f7f9",
      }}
    >
      {/* SIDEBAR – giống hệt Dashboard nhưng active Khách hàng */}
      <div
        style={{
          width: "260px",
          background: "#F9D9E4",
          padding: "24px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            background: "#F3C1D8",
            borderRadius: "10px",
            margin: "0 auto",
          }}
        ></div>
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: 600,
          }}
        >
          SPA LOGO
        </p>

        <div style={{ marginTop: "30px" }}>
          {[
            { label: "Dashboard", link: "/" },
            { label: "Khách hàng", link: "/khach-hang" },
            { label: "Lịch hẹn", link: "#" },
            { label: "Liệu trình", link: "#" },
            { label: "Kho", link: "#" },
            { label: "POS", link: "#" },
            { label: "CSKH", link: "#" },
            { label: "Báo cáo", link: "#" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                textDecoration: "none",
                fontWeight: 600,
                color: item.label === "Khách hàng" ? "#000" : "#333",
                background:
                  item.label === "Khách hàng" ? "#EFA6C3" : "transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT – Khách hàng */}
      <div style={{ flex: 1, padding: "24px 32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Quản lý khách hàng
        </h1>

        {/* Thanh tìm kiếm + filter + nút thêm */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Tìm theo tên hoặc số điện thoại…"
            style={{
              flex: 1,
              minWidth: "240px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <select
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <option>Tất cả</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>

          <button
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#e88aaa",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* Bảng khách hàng */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #eee",
            padding: "20px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#F9D9E4" }}>
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
              {customers.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={td}>{c.name}</td>
                  <td style={td}>{c.phone}</td>
                  <td style={td}>{c.gender}</td>
                  <td style={td}>
                    <span
                      style={{
                        background: "#F3C1D8",
                        padding: "3px 8px",
                        borderRadius: "12px",
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
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        background: "#fff",
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
    </div>
  );
}

const th = {
  padding: "10px",
  textAlign: "left",
};

const td = {
  padding: "10px",
};
