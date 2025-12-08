import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ThemKhachHang() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "",
    birthday: "",
    source: "",
    address: "",
    skin_condition: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.gender || !form.birthday) {
      alert("Vui lòng nhập đủ thông tin bắt buộc.");
      return;
    }

    const { error } = await supabase.from("customers").insert([
      {
        name: form.name,
        phone: form.phone,
        gender: form.gender,
        tag: form.tag,
        birthday: form.birthday,
        source: form.source,
        address: form.address,
        skin_condition: form.skin_condition,
        notes: form.notes
      }
    ]);

    if (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } else {
      alert("Đã lưu khách hàng!");
      window.location.href = "/khach-hang";
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Thêm khách hàng</h1>

      {/* Tên */}
      <input
        name="name"
        placeholder="Tên khách hàng"
        value={form.name}
        onChange={handleChange}
      />

      {/* Số điện thoại (chỉ cho nhập số) */}
      <input
        name="phone"
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Số điện thoại"
        value={form.phone}
        onChange={handleChange}
      />

      {/* Giới tính */}
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Chọn giới tính</option>
        <option value="Nữ">Nữ</option>
        <option value="Nam">Nam</option>
      </select>

      {/* Ngày sinh — chuẩn type="date" */}
      <input
        type="date"
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        style={{ padding: "12px", borderRadius: "12px" }}
      />

      {/* Nguồn khách */}
      <select name="source" value={form.source} onChange={handleChange}>
        <option value="">Chọn nguồn khách</option>
        <option value="Facebook">Facebook</option>
        <option value="TikTok">TikTok</option>
        <option value="Giới thiệu">Giới thiệu</option>
      </select>

      {/* Địa chỉ */}
      <input
        name="address"
        placeholder="Địa chỉ"
        value={form.address}
        onChange={handleChange}
      />

      {/* Tình trạng da */}
      <input
        name="skin_condition"
        placeholder="Da khô, da dầu..."
        value={form.skin_condition}
        onChange={handleChange}
      />

      {/* Ghi chú – FIX LỆCH NHƯ ANH BẢO */}
      <textarea
        name="notes"
        placeholder="Ghi chú thêm (nếu có)"
        value={form.notes}
        onChange={handleChange}
        style={{
          borderRadius: "16px",
          padding: "16px",
          minHeight: "150px",
          width: "100%",
          resize: "none"
        }}
      ></textarea>

      <button onClick={handleSubmit}>Lưu khách hàng</button>
    </div>
  );
}
