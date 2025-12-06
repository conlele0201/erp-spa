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
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Vui lòng nhập tên khách hàng");
      return;
    }

    if (!form.phone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    alert("Thêm khách hàng thành công!");
    router.push("/khach-hang");
  };

  return (
    <div
      style={{
        padding: "0px 20px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Thêm khách hàng
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 28,
          borderRadius: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <div>
            <label style={label}>Tên khách hàng *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={input}
              placeholder="Nhập tên khách hàng..."
            />
          </div>

          <div>
            <label style={label}>Số điện thoại *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={input}
              placeholder="VD: 0901234567"
            />
          </div>

          <div>
            <label style={label}>Giới tính</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={input}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label style={label}>Tag phân loại</label>
            <select
              name="tag"
              value={form.tag}
              onChange={handleChange}
              style={input}
            >
              <option value="">Không phân loại</option>
              <option value="VIP">VIP</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
            </select>
          </div>

          <div>
            <label style={label}>Ngày sinh</label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label style={label}>Ghi chú</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Ghi chú thêm..."
              style={{
                ...input,
                height: 100,
                resize: "vertical",
                borderRadius: 20,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 28,
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/khach-hang")}
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Hủy
          </button>

          <button
            type="submit"
            style={{
              padding: "10px 26px",
              borderRadius: 999,
              border: "none",
              background: "#f973b4",
              color: "#fff",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Lưu khách hàng
          </button>
        </div>
      </form>
    </div>
  );
}

const label = {
  fontSize: 15,
  fontWeight: 600,
  marginBottom: 6,
  display: "block",
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
