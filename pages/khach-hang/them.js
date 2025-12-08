// pages/khach-hang/them.js

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ThemKhachHangPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("Không phân loại");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [source, setSource] = useState("");
  const [skinCondition, setSkinCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function parseBirthdayToISO(value) {
    // value dạng dd/mm/yyyy -> yyyy-mm-dd
    if (!value) return null;
    const parts = value.split("/").map((p) => p.trim());
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    if (!day || !month || !year) return null;
    const d = day.padStart(2, "0");
    const m = month.padStart(2, "0");
    return `${year}-${m}-${d}`;
  }

  async function handleSave() {
    if (!supabase) {
      alert(
        "Không tìm thấy cấu hình Supabase. Vui lòng kiểm tra lại biến môi trường."
      );
      return;
    }

    if (!name.trim()) {
      alert("Vui lòng nhập tên khách hàng.");
      return;
    }

    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!gender) {
      alert("Vui lòng chọn giới tính.");
      return;
    }

    if (!birthday.trim()) {
      alert("Vui lòng nhập ngày sinh (dd/mm/yyyy).");
      return;
    }

    const birthdayISO = parseBirthdayToISO(birthday);
    if (!birthdayISO) {
      alert("Ngày sinh không đúng định dạng dd/mm/yyyy.");
      return;
    }

    try {
      setIsSaving(true);

      const { data, error } = await supabase.from("customers").insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          gender,
          tag,
          birthday: birthdayISO,
          address: address.trim() || null,
          source: source || null,
          skin_condition: skinCondition.trim() || null,
          notes: notes.trim() || null,
          // total_spent, visits, last_visit dùng default trong DB
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      // Lưu thành công -> quay về trang danh sách khách hàng
      alert("Lưu khách hàng thành công.");
      window.location.href = "/khach-hang";
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    window.location.href = "/khach-hang";
  }

  return (
    <div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Thêm khách hàng
      </h1>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Hàng 1: Tên + SĐT */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Tên khách hàng *</label>
            <input
              placeholder="VD: Ngọc Anh"
              style={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input
              placeholder="VD: 0901234567"
              style={input}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính *</label>
            <select
              style={input}
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
            <label style={label}>Tag phân loại</label>
            <select
              style={input}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
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
              placeholder="dd/mm/yyyy"
              style={input}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select
              style={input}
              value={source}
              onChange={(e) => setSource(e.target.value)}
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

        {/* Hàng 4: Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            placeholder="VD: 123 Nguyễn Trãi, Quận 1"
            style={input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Hàng 5: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô, da nhạy cảm..."
            style={input}
            value={skinCondition}
            onChange={(e) => setSkinCondition(e.target.value)}
          />
        </div>

        {/* Hàng 6: Ghi chú */}
        <div style={{ marginBottom: 30 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            placeholder="Ghi chú thêm (nếu có)..."
            style={{
              ...input,
              height: 140,
              resize: "vertical",
            }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Nút Hủy + Lưu */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 10,
          }}
        >
          <button style={btnCancel} type="button" onClick={handleCancel}>
            Hủy
          </button>
          <button
            style={btnPrimary}
            type="button"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Đang lưu..." : "Lưu khách hàng"}
          </button>
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
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: 14,
  background: "#f9fafb",
};

const btnPrimary = {
  padding: "12px 22px",
  borderRadius: 999,
  border: "none",
  background: "#facc15",
  color: "#111827",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};

const btnCancel = {
  padding: "12px 22px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};
