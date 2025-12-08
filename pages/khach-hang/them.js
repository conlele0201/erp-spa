// pages/khach-hang/them.js
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Layout from "../../components/Layout";

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
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.gender || !form.birthday) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    const { error } = await supabase.from("customers").insert([
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        gender: form.gender,
        tag: form.tag,
        birthday: form.birthday,
        source: form.source,
        address: form.address,
        skin_condition: form.skin_condition,
        notes: form.notes,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } else {
      alert("Lưu khách hàng thành công!");
      window.location.href = "/khach-hang";
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Thêm khách hàng</h1>

        <div className="form-card">

          {/* Tên */}
          <div className="form-row">
            <div className="form-group">
              <label>Tên khách hàng *</label>
              <input
                type="text"
                name="name"
                placeholder="VD: Ngọc Anh"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* SĐT */}
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="VD: 0901234567"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Giới tính / Tag */}
          <div className="form-row">
            <div className="form-group">
              <label>Giới tính *</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Chọn giới tính</option>
                <option value="Nữ">Nữ</option>
                <option value="Nam">Nam</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tag phân loại</label>
              <select name="tag" value={form.tag} onChange={handleChange}>
                <option value="">Không phân loại</option>
                <option value="Khách mới">Khách mới</option>
                <option value="Khách quen">Khách quen</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

          {/* Ngày sinh / Nguồn */}
          <div className="form-row">
            <div className="form-group">
              <label>Ngày sinh *</label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Nguồn khách</label>
              <select name="source" value={form.source} onChange={handleChange}>
                <option value="">Chọn nguồn khách</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="Giới thiệu">Giới thiệu</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              placeholder="VD: 123 Nguyễn Trãi, Quận 1"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Tình trạng da */}
          <div className="form-group">
            <label>Tình trạng da</label>
            <input
              type="text"
              name="skin_condition"
              placeholder="VD: Da dầu, da khô, da nhạy cảm..."
              value={form.skin_condition}
              onChange={handleChange}
            />
          </div>

          {/* Ghi chú */}
          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              name="notes"
              placeholder="Ghi chú thêm (nếu có)..."
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Nút */}
          <div className="actions">
            <button className="cancel" onClick={() => history.back()}>
              Hủy
            </button>
            <button className="save" onClick={handleSubmit}>
              Lưu khách hàng
            </button>
          </div>
        </div>
      </div>

      {/* CSS nội bộ để tránh lỗi layout */}
      <style jsx>{`
        .container {
          padding: 30px;
        }
        .title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .form-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        .form-row {
          display: flex;
          gap: 20px;
        }
        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        label {
          font-weight: 600;
          margin-bottom: 6px;
        }
        input,
        select,
        textarea {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: #f7f7f7;
          border: 1px solid #e6e6e6;
          font-size: 15px;
        }
        textarea {
          min-height: 120px;
          resize: none;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
        }
        .cancel {
          background: #eee;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 600;
        }
        .save {
          background: #f7c948;
          padding: 12px 28px;
          border-radius: 30px;
          font-weight: 700;
          color: black;
        }
      `}</style>
    </Layout>
  );
}
