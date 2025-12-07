// pages/khach-hang/them.js
import { useState } from "react";
import supabase from "../../lib/supabaseClient";

export default function ThemKhachHangPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("");
  const [birthday, setBirthday] = useState("");
  const [source, setSource] = useState("");
  const [address, setAddress] = useState("");
  const [referrer, setReferrer] = useState("");
  const [skin, setSkin] = useState("");
  const [note, setNote] = useState("");

  const handleSave = async () => {
    if (!name || !phone) {
      alert("Tên khách hàng và số điện thoại là bắt buộc!");
      return;
    }

    const { error } = await supabase.from("customers").insert([
      {
        name,
        phone,
        gender,
        tag,
        birthday,
        source,
        address,
        referrer,
        skin_status: skin,
        note,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Lỗi khi lưu khách hàng!");
    } else {
      alert("Lưu thành công!");
      window.location.href = "/khach-hang";
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
              placeholder="Nhập tên khách hàng..."
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Hàng 2: Giới tính + Tag */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính</label>
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
              <option value="">Không phân loại</option>
              <option value="VIP">VIP</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
              <option value="Tiềm năng">Khách tiềm năng</option>
            </select>
          </div>
        </div>

        {/* Hàng 3: Ngày sinh + Nguồn khách */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Ngày sinh</label>
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
              <option value="">Không rõ</option>
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
            placeholder="VD: 123 Nguyễn Trãi, Phường 4, Quận 5, TP.HCM"
            style={input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Hàng 5: Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input
            placeholder="Tên người giới thiệu (nếu có)"
            style={input}
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
        </div>

        {/* Hàng 6: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô, da nhạy cảm..."
            style={input}
            value={skin}
            onChange={(e) => setSkin(e.target.value)}
          />
        </div>

        {/* Ghi chú */}
        <div style={{ marginBottom: 30 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            placeholder="Ghi chú thêm..."
            style={{ ...input, height: 120, resize: "vertical" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
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
          <button style={btnPrimary} onClick={handleSave}>
            Lưu khách hàng
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
