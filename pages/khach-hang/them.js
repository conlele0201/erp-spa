// pages/khach-hang/them.js

export default function ThemKhachHang() {
  return (
    <div>
      {/* Tiêu đề */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 30,
        }}
      >
        Thêm khách hàng
      </h1>

      {/* Khung form */}
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          maxWidth: 900,
        }}
      >
        {/* Hàng 1: Tên + SĐT */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Tên khách hàng *</label>
            <input placeholder="Nhập tên khách hàng..." style={input} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input placeholder="VD: 0901234567" style={input} />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính</label>
            <select style={input}>
              <option>Chọn giới tính</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Tag phân loại</label>
            <select style={input}>
              <option>Không phân loại</option>
              <option>VIP</option>
              <option>Khách mới</option>
              <option>Khách quen</option>
              <option>Tiềm năng</option>
              <option>Hay hủy lịch</option>
            </select>
          </div>
        </div>

        {/* Hàng 3: Ngày sinh + Nguồn khách */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Ngày sinh</label>
            <input placeholder="dd/mm/yyyy" style={input} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select style={input}>
              <option>Không rõ</option>
              <option>Facebook</option>
              <option>Zalo</option>
              <option>TikTok</option>
              <option>Google</option>
              <option>Khách cũ giới thiệu</option>
              <option>Tự đến</option>
            </select>
          </div>
        </div>

        {/* Hàng 4: Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input placeholder="Tên người giới thiệu (nếu có)" style={input} />
        </div>

        {/* Hàng 5: Thông tin y khoa */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input placeholder="VD: Da dầu, mụn nhẹ, thâm..." style={input} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={label}>Dị ứng mỹ phẩm</label>
          <input placeholder="VD: Dị ứng cồn, hương liệu..." style={input} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={label}>Thuốc đang sử dụng</label>
          <input placeholder="VD: Thuốc trị mụn, corticoid..." style={input} />
        </div>

        {/* Ghi chú */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            placeholder="Ghi chú thêm..."
            style={{
              ...input,
              height: 140,
              borderRadius: 16,
              resize: "none",
              paddingTop: 14,
            }}
          />
        </div>

        {/* Nút hành động */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 20,
            marginTop: 30,
          }}
        >
          <button
            onClick={() => (window.location.href = "/khach-hang")}
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Hủy
          </button>

          <button
            style={{
              padding: "12px 26px",
              borderRadius: 999,
              border: "none",
              background: "#f973b4",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Lưu khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
};

const input = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14,
  background: "#fff",
};
