// pages/khach-hang/them.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabaseClient";

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
    referrer: "",
    skin_condition: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomer = async () => {
    if (!form.name || !form.phone) {
      alert("Tên khách hàng và số điện thoại là bắt buộc!");
      return;
    }

    const { error } = await supabase.from("customers").insert({
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      tag: form.tag,
      birthday: form.birthday || null,
      address: form.address,
      source: form.source,
      referrer: form.referrer,
      skin_condition: form.skin_condition,
      notes: form.notes,
      total_spent: 0,
      visits: 0,
      last_visit: null,
    });

    if (error) {
      console.log(error);
      alert("Lỗi khi lưu khách hàng!");
    } else {
      alert("Đã lưu khách hàng!");
      router.push("/khach-hang");
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Thêm khách hàng
      </h1>

      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        }}
      >
        {/* --- Dòng 1: Tên + SĐT --- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <input
            name="name"
            placeholder="Tên khách hàng *"
            value={form.name}
            onChange={handleChange}
            style={input}
          />
          <input
            name="phone"
            placeholder="Số điện thoại *"
            value={form.phone}
            onChange={handleChange}
            style={input}
          />
        </div>

        {/* --- Dòng 2: Giới tính + Tag --- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <select name="gender" value={form.gender} onChange={handleChange} style={input}>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>

          <select name="tag" value={form.tag} onChange={handleChange} style={input}>
            <option value="">Không phân loại</option>
            <option value="VIP">VIP</option>
            <option value="Khách mới">Khách mới</option>
            <option value="Khách quen">Khách quen</option>
          </select>
        </div>

        {/* --- Ngày sinh --- */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
            style={input}
          />
        </div>

        {/* --- Địa chỉ --- */}
        <div style={{ marginBottom: 20 }}>
          <input
            name="address"
            placeholder="Địa chỉ khách hàng..."
            value={form.address}
            onChange={handleChange}
            style={input}
          />
        </div>

        {/* --- Người giới thiệu + Nguồn khách --- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <input
            name="referrer"
            placeholder="Tên người giới thiệu (nếu có)"
            value={form.referrer}
            onChange={handleChange}
            style={input}
          />

          <select name="source" value={form.source} onChange={handleChange} style={input}>
            <option value="">Nguồn khách</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
            <option value="Google">Google</option>
            <option value="Người quen">Người quen</option>
            <option value="Không rõ">Không rõ</option>
          </select>
        </div>

        {/* --- Tình trạng da --- */}
        <div style={{ marginBottom: 20 }}>
          <input
            name="skin_condition"
            placeholder="Tình trạng da (VD: da dầu, mụn nhẹ...)"
            value={form.skin_condition}
            onChange={handleChange}
            style={input}
          />
        </div>

        {/* --- Ghi chú --- */}
        <textarea
          name="notes"
          placeholder="Ghi chú thêm..."
          value={form.notes}
          onChange={handleChange}
          style={{ ...input, height: 120, resize: "none" }}
        ></textarea>

        {/* --- Nút --- */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 30, gap: 20 }}>
          <button
            onClick={() => router.push("/khach-hang")}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              background: "#eee",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>

          <button
            onClick={saveCustomer}
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              background: "#f973b4",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Lưu khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

const input = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14,
};
