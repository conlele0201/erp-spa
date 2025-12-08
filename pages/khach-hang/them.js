// pages/khach-hang/them.js

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // ĐÚNG đường dẫn: /lib/supabaseClient.js

export default function ThemKhachHangPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("Không phân loại");
  const [birthday, setBirthday] = useState("");
  const [source, setSource] = useState("");
  const [address, setAddress] = useState("");
  const [skinCondition, setSkinCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên khách hàng.");
      return false;
    }

    const nameParts = name.trim().split(" ");
    if (nameParts.length < 2) {
      alert("Tên khách hàng phải là họ và tên (ít nhất 2 từ).");
      return false;
    }

    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return false;
    }

    const phoneDigits = phone.trim();
    if (!/^\d{9,11}$/.test(phoneDigits)) {
      alert("Số điện thoại phải là 9–11 chữ số.");
      return false;
    }

    if (!gender) {
      alert("Vui lòng chọn giới tính.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        gender,
        tag,
        birthday: birthday || null, // Supabase cột date, để null nếu không chọn
        address: address.trim() || null,
        source: source || null,
        skin_condition: skinCondition.trim() || null,
        notes: notes.trim() || null,
      };

      const { error } = await supabase.from("customers").insert([payload]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Có lỗi xảy ra khi lưu khách hàng. Vui lòng thử lại.");
        return;
      }

      alert("Lưu khách hàng thành công.");
      router.push("/khach-hang");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/khach-hang");
  };

  return (
    <div style={{ padding: "32px 40px 40px 40px" }}>
      {/* Tiêu đề */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Thêm khách hàng
      </h1>
      <p
        style={{
          marginBottom: 24,
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        Nhập thông tin cơ bản để tạo mới hồ sơ khách hàng trong hệ thống ERP.
      </p>

      {/* Card form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          maxWidth: 1200,
        }}
      >
        {/* Hàng 1: Tên + SĐT */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>
              Tên khách hàng <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              style={inputStyle}
              placeholder="VD: Ngọc Anh"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>
              Số điện thoại <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              style={inputStyle}
              placeholder="VD: 0901234567"
              inputMode="numeric"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "")) // chỉ cho nhập số
              }
            />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>
              Giới tính <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              style={selectStyle}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nữ">Nữ</option>
              <option value="Nam">Nam</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Tag phân loại</label>
            <select
              style={selectStyle}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Không phân loại">Không phân loại</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
              <option value="VIP">VIP</option>
              <option value="Khách tiềm năng">Khách tiềm năng</option>
            </select>
          </div>
        </div>

        {/* Hàng 3: Ngày sinh + Nguồn khách */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Ngày sinh</label>
            <input
              style={inputStyle}
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Nguồn khách</label>
            <select
              style={selectStyle}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Chọn nguồn khách</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Zalo">Zalo</option>
              <option value="Google">Google</option>
              <option value="Đi ngang qua">Đi ngang qua</option>
              <option value="Giới thiệu">Giới thiệu</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        {/* Hàng 4: Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Địa chỉ</label>
          <input
            style={inputStyle}
            placeholder="VD: 123 Nguyễn Trãi, Quận 1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Hàng 5: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Tình trạng da</label>
          <input
            style={inputStyle}
            placeholder="VD: Da dầu, da khô, da nhạy cảm, mụn nhẹ..."
            value={skinCondition}
            onChange={(e) => setSkinCondition(e.target.value)}
          />
        </div>

        {/* Hàng 6: Ghi chú */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Ghi chú</label>
          <textarea
            style={textAreaStyle}
            placeholder="Ghi chú thêm (nếu có)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Nút */}
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
            style={buttonGhost}
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </button>
          <button type="submit" style={buttonPrimary} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu khách hàng"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* STYLE CHUẨN – TRẮNG / XÁM / VÀNG NHẠT */
const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 14,
  backgroundColor: "#f9fafb",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
};

const textAreaStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 14,
  backgroundColor: "#f9fafb",
  minHeight: 140,
  resize: "vertical",
};

const buttonPrimary = {
  padding: "11px 22px",
  borderRadius: 999,
  border: "none",
  background: "#fbbf24", // vàng nhạt
  color: "#111827",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

const buttonGhost = {
  padding: "11px 22px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#374151",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
