import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ThemKhachHangPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "",
    birthday: "",
    source: "",
    address: "",
    skin_condition: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Chỉ cho nhập số ở ô SĐT
    if (name === "phone") {
      const onlyNumber = value.replace(/[^0-9]/g, "");
      setForm((prev) => ({ ...prev, [name]: onlyNumber }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate bắt buộc
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên khách hàng.");
      return;
    }
    if (!form.phone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!form.gender) {
      alert("Vui lòng chọn giới tính.");
      return;
    }
    if (!form.birthday) {
      alert("Vui lòng chọn ngày sinh.");
      return;
    }

    // HTML date trả về YYYY-MM-DD → Supabase cột date nhận được luôn
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      gender: form.gender,
      tag: form.tag || null,
      birthday: form.birthday, // dạng YYYY-MM-DD
      source: form.source || null,
      address: form.address || null,
      skin_condition: form.skin_condition || null,
      notes: form.notes || null,
      // các cột khác: total_spent, visits, last_visit... để mặc định 0 / NULL
    };

    const { error } = await supabase.from("customers").insert([payload]);

    if (error) {
      console.error(error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } else {
      alert("Đã lưu khách hàng!");
      window.location.href = "/khach-hang";
    }
  };

  const card = {
    background: "#ffffff",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
    maxWidth: 1200,
    margin: "0 auto",
  };

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
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
    background: "#f9fafb",
  };

  const btnPrimary = {
    padding: "12px 24px",
    borderRadius: 999,
    border: "none",
    background: "#facc15",
    color: "#111827",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  };

  const btnCancel = {
    padding: "12px 24px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "32px 40px" }}>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Thêm khách hàng
      </h1>

      <div style={card}>
        {/* Hàng 1: Tên + SĐT */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Tên khách hàng *</label>
            <input
              name="name"
              placeholder="VD: Ngọc Anh"
              style={input}
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="VD: 0901234567"
              style={input}
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính *</label>
            <select
              name="gender"
              style={input}
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nữ">Nữ</option>
              <option value="Nam">Nam</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Tag phân loại</label>
            <select
              name="tag"
              style={input}
              value={form.tag}
              onChange={handleChange}
            >
              <option value="">Không phân loại</option>
              <option value="VIP">VIP</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
              <option value="Khách tiềm năng">Khách tiềm năng</option>
            </select>
          </div>
        </div>

        {/* Hàng 3: Ngày sinh + Nguồn khách */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Ngày sinh *</label>
            <input
              name="birthday"
              type="date"
              style={input}
              value={form.birthday}
              onChange={handleChange}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select
              name="source"
              style={input}
              value={form.source}
              onChange={handleChange}
            >
              <option value="">Chọn nguồn khách</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Zalo">Zalo</option>
              <option value="Google">Google</option>
              <option value="Giới thiệu">Giới thiệu</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        {/* Hàng 4: Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            name="address"
            placeholder="VD: 123 Nguyễn Trãi, Quận 1"
            style={input}
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 5: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            name="skin_condition"
            placeholder="VD: Da dầu, da khô, da nhạy cảm..."
            style={input}
            value={form.skin_condition}
            onChange={handleChange}
          />
        </div>

        {/* Hàng 6: Ghi chú – chỉnh lại layout vuông, không méo */}
        <div style={{ marginBottom: 24 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            name="notes"
            placeholder="Ghi chú thêm (nếu có)..."
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 20, // không còn bo tròn 999 khiến méo
              border: "1px solid #e5e7eb",
              outline: "none",
              fontSize: 14,
              background: "#f9fafb",
              minHeight: 140,
              resize: "vertical",
            }}
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Nút Hủy + Lưu */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            type="button"
            style={btnCancel}
            onClick={() => (window.location.href = "/khach-hang")}
          >
            Hủy
          </button>
          <button type="button" style={btnPrimary} onClick={handleSubmit}>
            Lưu khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}
