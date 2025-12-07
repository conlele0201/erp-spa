// pages/khach-hang/them.js

export default function ThemKhachHangPage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Thêm khách hàng
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Hàng 1: Tên khách + SĐT */}
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
              <option>Nữ</option>
              <option>Nam</option>
              <option>Khác</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Tag phân loại</label>
            <select style={input}>
              <option>Không phân loại</option>
              <option>VIP</option>
              <option>Khách mới</option>
              <option>Khách quen</option>
              <option>Khách tiềm năng</option>
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
              <option>TikTok</option>
              <option>Zalo</option>
              <option>Đi ngang qua</option>
              <option>Giới thiệu</option>
            </select>
          </div>
        </div>

        {/* Hàng 4: ĐỊA CHỈ — NEW!!! */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            placeholder="VD: 123 Nguyễn Trãi, Phường 4, Quận 5, TP.HCM"
            style={input}
          />
        </div>

        {/* Hàng 5: Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input placeholder="Tên người giới thiệu (nếu có)" style={input} />
        </div>

        {/* Hàng 6: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô, da nhạy cảm, mụn nhẹ..."
            style={input}
          />
        </div>

        {/* Hàng cuối: Ghi chú */}
        <div style={{ marginBottom: 30 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            placeholder="Ghi chú thêm..."
            style={{
              ...input,
              height: 120,
              resize: "vertical",
            }}
          />
        </div>

        {/* Nút Lưu + Hủy */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button style={btnCancel}>Hủy</button>
          <button style={btnPrimary}>Lưu khách hàng</button>
        </div>
      </div>
    </div>
  );
}

/* STYLE CHUẨN */
const label = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600,
};

const input = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14,
};

const btnPrimary = {
  padding: "12px 22px",
  borderRadius: 999,
  border: "none",
  background: "#f973b4",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};

const btnCancel = {
  padding: "12px 22px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};
