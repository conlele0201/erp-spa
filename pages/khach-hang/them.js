// pages/khach-hang/them.js

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // ĐƯỜNG DẪN ĐÚNG

export default function ThemKhachHangPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "Không phân loại",
    birth_date: "",
    source: "Không rõ",
    address: "",
    referrer: "",
    skin_status: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) {
      alert("Vui lòng nhập HỌ TÊN khách hàng.");
      return false;
    }

    const phone = form.phone.trim();

    // Chỉ cho phép số, độ dài 9–11 số
    if (!/^[0-9]{9,11}$/.test(phone)) {
      alert("Số điện thoại không hợp lệ. Chỉ nhập số, 9–11 ký tự.");
      return false;
    }

    if (!form.gender) {
      alert("Vui lòng chọn giới tính.");
      return false;
    }

    if (!form.birth_date) {
      alert("Vui lòng chọn ngày sinh.");
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("customers").insert([
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          gender: form.gender,
          tag: form.tag,
          birth_date: form.birth_date || null,
          source: form.source || null,
          address: form.address || null,
          referrer: form.referrer || null,
          skin_status: form.skin_status || null,
          note: form.note || null,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Lưu khách hàng thất bại. Vui lòng thử lại.");
        return;
      }

      alert("Lưu khách hàng thành công.");
      router.push("/khach-hang");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push("/khach-hang");
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Thêm khách hàng
      </h1>

      <form
        onSubmit={handleSubmit}
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
            <input
              type="text"
              placeholder="Nhập tên khách hàng..."
              style={input}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input
              type="tel"
              placeholder="VD: 0901234567"
              style={input}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính *</label>
            <select
              style={input}
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
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
              style={input}
              value={form.tag}
              onChange={(e) => handleChange("tag", e.target.value)}
            >
              <option value="Không phân loại">Không phân loại</option>
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
              type="date"
              style={input}
              value={form.birth_date}
              onChange={(e) => handleChange("birth_date", e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select
              style={input}
              value={form.source}
              onChange={(e) => handleChange("source", e.target.value)}
            >
              <option value="Không rõ">Không rõ</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Zalo">Zalo</option>
              <option value="Đi ngang qua">Đi ngang qua</option>
              <option value="Giới thiệu">Giới thiệu</option>
            </select>
          </div>
        </div>

        {/* Hàng 4: Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            type="text"
            placeholder="VD: 123 Nguyễn Trãi, Phường 4, Quận 5, TP.HCM"
            style={input}
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* Hàng 5: Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input
            type="text"
            placeholder="Tên người giới thiệu (nếu có)"
            style={input}
            value={form.referrer}
            onChange={(e) => handleChange("referrer", e.target.value)}
          />
        </div>

        {/* Hàng 6: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            type="text"
            placeholder="VD: Da dầu, da khô, da nhạy cảm, mụn nhẹ..."
            style={input}
            value={form.skin_status}
            onChange={(e) => handleChange("skin_status", e.target.value)}
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
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
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
          <button
            type="button"
            style={btnCancel}
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </button>
          <button type="submit" style={btnPrimary} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu khách hàng"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* STYLE CHUẨN – GIỮ NGUYÊN */
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
