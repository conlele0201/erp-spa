// pages/khach-hang/them.js
import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabaseClient";

export default function ThemKhachHangPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    tag: "Không phân loại",
    birthday: "",
    address: "",
    source: "",
    referrer: "",
    skin_condition: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Chuyển dd/mm/yyyy -> yyyy-mm-dd
  const parseBirthday = (value) => {
    if (!value) return null;
    const parts = value.split("/").map((p) => p.trim());
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts;
    if (!dd || !mm || !yyyy) return null;
    // kiểm tra số cơ bản
    if (
      isNaN(Number(dd)) ||
      isNaN(Number(mm)) ||
      isNaN(Number(yyyy)) ||
      dd.length > 2 ||
      mm.length > 2 ||
      yyyy.length !== 4
    ) {
      return null;
    }
    return `${yyyy.padStart(4, "0")}-${mm.padStart(2, "0")}-${dd.padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate cơ bản
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên khách hàng.");
      return;
    }
    if (!form.phone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    // Chỉ cho số, 8–15 ký tự
    const phoneClean = form.phone.replace(/\s+/g, "");
    if (!/^[0-9]{8,15}$/.test(phoneClean)) {
      alert("Số điện thoại chỉ được chứa số (8–15 chữ số).");
      return;
    }

    const birthdayISO = parseBirthday(form.birthday);
    if (form.birthday && !birthdayISO) {
      alert("Ngày sinh không đúng định dạng dd/mm/yyyy.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("customers").insert([
        {
          name: form.name.trim(),
          phone: phoneClean,
          gender: form.gender || null,
          tag: form.tag || null,
          birthday: birthdayISO, // null nếu không nhập
          address: form.address || null,
          source: form.source || null,
          referrer: form.referrer || null,
          skin_condition: form.skin_condition || null,
          notes: form.notes || null,
          // total_spent, visits, last_visit, created_at, updated_at dùng default trong DB
        },
      ]);

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
              placeholder="Nhập tên khách hàng..."
              style={input}
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Số điện thoại *</label>
            <input
              placeholder="VD: 0901234567"
              style={input}
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
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
              onChange={handleChange("gender")}
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
              onChange={handleChange("tag")}
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
              value={form.birthday}
              onChange={handleChange("birthday")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={label}>Nguồn khách</label>
            <select
              style={input}
              value={form.source}
              onChange={handleChange("source")}
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
            value={form.address}
            onChange={handleChange("address")}
          />
        </div>

        {/* Hàng 5: Người giới thiệu */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Người giới thiệu</label>
          <input
            placeholder="Tên người giới thiệu (nếu có)"
            style={input}
            value={form.referrer}
            onChange={handleChange("referrer")}
          />
        </div>

        {/* Hàng 6: Tình trạng da */}
        <div style={{ marginBottom: 20 }}>
          <label style={label}>Tình trạng da</label>
          <input
            placeholder="VD: Da dầu, da khô, da nhạy cảm, mụn nhẹ..."
            style={input}
            value={form.skin_condition}
            onChange={handleChange("skin_condition")}
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
            value={form.notes}
            onChange={handleChange("notes")}
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
