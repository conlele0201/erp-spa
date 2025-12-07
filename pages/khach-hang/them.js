import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/router";

export default function ThemKhachHangPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "",
    birthday: "",
    source: "",
    address: "",
    referral: "",
    skin_status: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Tên khách hàng không được để trống!");
      return;
    }

    if (!/^[0-9]{9,12}$/.test(form.phone)) {
      alert("Số điện thoại phải là số và từ 9–12 ký tự!");
      return;
    }

    if (form.birthday && !/^\d{4}-\d{2}-\d{2}$/.test(form.birthday)) {
      alert("Ngày sinh phải đúng định dạng YYYY-MM-DD!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("customers").insert({
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      tag: form.tag,
      birthday: form.birthday || null,
      source: form.source,
      address: form.address,
      referral: form.referral,
      skin_status: form.skin_status,
      note: form.note,
    });

    setLoading(false);

    if (error) {
      alert("Lỗi khi lưu: " + error.message);
      return;
    }

    alert("Lưu khách hàng thành công!");
    router.push("/khach-hang");
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
        {/* Hàng 1 */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Tên khách hàng *</label>
            <input
              placeholder="Nhập tên khách hàng..."
              style={input}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input
              placeholder="VD: 0901234567"
              style={input}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>

        {/* Hàng 2 */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Giới tính</label>
            <select
              style={input}
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option>Nữ</option>
              <option>Nam</option>
              <option>Khác</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Tag phân loại</label>
            <select
              style={input}
              value={form.tag}
              onChange={(e) => handleChange("tag", e.target.value)}
            >
              <option>Không phân loại</option>
              <option>VIP</option>
              <option>Khách mới</option>
              <option>Khách quen</option>
              <option>Khách tiềm năng</option>
            </select>
          </div>
        </div>

        {/* Hàng 3 */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={label}>Ngày sinh</label>
            <input
              type="date"
              style={input}
              value={form.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select
              style={input}
              value={form.source}
              onChange={(e) => handleChange("source", e.target.value)}
            >
              <option>Không rõ</option>
              <option>Facebook</option>
              <option>TikTok</option>
              <option>Zalo</option>
              <option>Đi ngang qua</option>
              <option>Giới thiệu</option>
            </select>
          </div>
        </div>

        {/* Địa chỉ */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Địa chỉ</label>
          <input
            placeholder="VD: 123 Nguyễn Trãi, Quận 5..."
            style={input}
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        {/* Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input
            placeholder="Tên người giới thiệu"
            style={input}
            value={form.referral}
            onChange={(e) => handleChange("referral", e.target.value)}
          />
        </div>

        {/* Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô..."
            style={input}
            value={form.skin_status}
            onChange={(e) => handleChange("skin_status", e.target.value)}
          />
        </div>

        {/* Ghi chú */}
        <div style={{ marginBottom: 30 }}>
          <label style={label}>Ghi chú</label>
          <textarea
            placeholder="Ghi chú thêm..."
            style={{ ...input, height: 120, resize: "vertical" }}
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button style={btnCancel} onClick={() => router.push("/khach-hang")}>
            Hủy
          </button>
          <button style={btnPrimary} onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu khách hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
