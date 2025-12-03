import Layout from "../../components/Layout";

export default function KhachHang() {
  return (
    <Layout active="Khách hàng">
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px" }}>
          Quản lý khách hàng
        </h1>

        {/* Thanh tìm kiếm */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc số điện thoại..."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <select
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <option>Tất cả</option>
            <option>VIP</option>
            <option>Khách mới</option>
            <option>Khách quen</option>
          </select>
        </div>

        {/* Bảng khách hàng */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9d9e2" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>Tên khách</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Số điện thoại</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Giới tính</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Tag</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Tổng chi tiêu</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Lần đến</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Gần nhất</th>
                <th style={{ padding: "12px" }}>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ padding: "12px" }}>Ngọc Anh</td>
                <td>0901234567</td>
                <td>Nữ</td>
                <td><span style={tag}>VIP</span></td>
                <td>12,500,000đ</td>
                <td>8</td>
                <td>02/12/2025</td>
                <td><button style={btn}>Xem</button></td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>Minh Khoa</td>
                <td>0938765432</td>
                <td>Nam</td>
                <td><span style={tag}>Khách mới</span></td>
                <td>4,200,000đ</td>
                <td>3</td>
                <td>28/11/2025</td>
                <td><button style={btn}>Xem</button></td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>Thu Hà</td>
                <td>0912345789</td>
                <td>Nữ</td>
                <td><span style={tag}>Khách quen</span></td>
                <td>7,800,000đ</td>
                <td>5</td>
                <td>25/11/2025</td>
                <td><button style={btn}>Xem</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const tag = {
  background: "#f7c6d8",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
};

const btn = {
  background: "#eee",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
