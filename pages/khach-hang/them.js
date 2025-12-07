// pages/khach-hang/them.js

import { useState } from "react";
import { useRouter } from "next/router";

export default function ThemKhachHang() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "",
    birthday: "",
    address: "",
    source: "",
    skin_condition: "",
    notes: "",
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    alert("Mock layout – chưa nối Supabase. Anh duyệt layout trước.");
  };

  return (
    <div style={wrapper}>
      <h1 style={title}>Thêm khách hàng</h1>
      <p style={subtitle}>Nhập thông tin hồ sơ khách hàng đầy đủ & chính xác.</p>

      <div style={card}>
        <div style={grid2}>

          {/* Tên khách */}
          <div style={fieldBox}>
            <label style={label}>Tên khách hàng *</label>
            <input
              style={input}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="VD: Ngọc Anh"
            />
          </div>

          {/* Số điện thoại */}
          <div style={fieldBox}>
            <label style={label}>Số điện thoại *</label>
            <input
              style={input}
              type="tel"
              pattern="[0-9]*"
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value.replace(/\D/g, ""))
              }
              placeholder="VD: 0901234567"
            />
          </div>

          {/* Giới tính */}
          <div style={fieldBox}>
            <label style={label}>Giới tính *</label>
            <select
              style={select}
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nữ">Nữ</option>
              <option value="Nam">Nam</option>
            </select>
          </div>

          {/* Tag phân loại */}
          <div style={fieldBox}>
            <label style={label}>Tag phân loại</label>
            <select
              style={select}
              value={form.tag}
              onChange={(e) => updateField("tag", e.target.value)}
            >
              <option value="">Không phân loại</option>
              <option value="VIP">VIP</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
              <option value="Khách tiềm năng">Khách tiềm năng</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div style={fieldBox}>
            <label style={label}>Ngày sinh</label>
            <input
              style={input}
              type="date"
              value={form.birthday}
              onChange={(e) => updateField("birthday", e.target.value)}
            />
          </div>

          {/* Nguồn khách */}
          <div style={fieldBox}>
            <label style={label}>Nguồn khách</label>
            <select
              style={select}
              value={form.source}
              onChange={(e) => updateField("source", e.target.value)}
            >
              <option value="">Chọn nguồn khách</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Zalo">Zalo</option>
              <option value="Đi ngang qua">Đi ngang qua</option>
              <option value="Giới thiệu">Giới thiệu</option>
            </select>
          </div>
        </div>

        {/* Địa chỉ */}
        <div style={fieldBox}>
          <label style={label}>Địa chỉ</label>
          <input
            style={input}
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="VD: 123 Nguyễn Trãi, Quận 1"
          />
        </div>

        {/* Tình trạng da */}
        <div style={fieldBox}>
          <label style={label}>Tình trạng da</label>
          <input
            style={input}
            value={form.skin_condition}
            onChange={(e) => updateField("skin_condition", e.target.value)}
            placeholder="VD: Da dầu, da nhạy cảm..."
          />
        </div>

        {/* Ghi chú */}
        <div style={fieldBox}>
          <label style={label}>Ghi chú</label>
          <textarea
            style={textarea}
            rows={4}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Ghi chú thêm (nếu có)"
          />
        </div>

        {/* Nút */}
        <div style={actionRow}>
          <button style={cancelButton} onClick={() => router.push("/khach-hang")}>
            Hủy
          </button>
          <button style={saveButton} onClick={handleSave}>
            Lưu khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
     STYLE
========================= */

const wrapper = { padding: "24px" };
const title = { fontSize: 28, fontWeight: 700, marginBottom: 4 };
const subtitle = { color: "#6b7280", marginBottom: 24 };

const card = {
  background: "#ffffff",
  padding: 28,
  borderRadius: 20,
  boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginBottom: 20,
};

const fieldBox = { display: "flex", flexDirection: "column", gap: 6 };

const label = { fontWeight: 600, fontSize: 14, color: "#374151" };

const input = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontSize: 14,
};

const select = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  fontSize: 14,
};

const textarea = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontSize: 14,
};

const actionRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 20,
};

const cancelButton = {
  padding: "12px 24px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
};

const saveButton = {
  padding: "12px 24px",
  borderRadius: 999,
  border: "none",
  background: "#f5c451",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 14,
  boxShadow: "0 10px 25px rgba(245,196,81,0.35)",
};
