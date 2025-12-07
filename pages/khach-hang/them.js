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
  const [skinStatus, setSkinStatus] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    // VALIDATION
    if (!name.trim()) return alert("Tên khách hàng không được bỏ trống!");
    if (!phone.trim()) return alert("Số điện thoại không được bỏ trống!");
    if (phone.length < 8) return alert("Số điện thoại không hợp lệ!");

    try {
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
          skin_status: skinStatus,
          notes,
        },
      ]);

      if (error) {
        console.error(error);
        return alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }

      alert("Đã lưu khách hàng thành công!");
      window.location.href = "/khach-hang";
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
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
        {/* Họ tên + SĐT */}
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
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="VD: 0901234567"
              style={input}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>
        </div>

        {/* Giới tính + Tag */}
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
              <option value="">Không phân loại</option>
              <option value="VIP">VIP</option>
              <option value="Khách mới">Khách mới</option>
              <option value="Khách quen">Khách quen</option>
              <option value="Tiềm năng">Khách tiềm năng</option>
            </select>
          </div>
        </div>

        {/* Ngày sinh + Nguồn khách */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Ngày sinh *</label>
            <input
              type="date"
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

        {/* Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            placeholder="VD: 123 Nguyễn Trãi..."
            style={input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input
            placeholder="Tên người giới thiệu (nếu có)"
            style={input}
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
        </div>

        {/* Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô..."
            style={input}
            value={skinStatus}
            onChange={(e) => setSkinStatus(e.target.value)}
          />
        </div>

        {/* Ghi chú */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            style={{ ...input, height: 120, resize: "vertical" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button style={btnCancel}>Hủy</button>
          <button style={btnPrimary} onClick={handleSave}>
            Lưu khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLE */
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
