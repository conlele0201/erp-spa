// pages/khach-hang/index.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./khachhang.module.css";
import Link from "next/link";

// Hàm chuẩn hóa: bỏ dấu + chuyển thường
const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") || "";

export default function KhachHang() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const { data, error } = await supabase.from("customers").select("*");

    if (error) {
      alert("Không tải được danh sách khách hàng");
      return;
    }

    setCustomers(data);
    setFiltered(data);
  }

  // SEARCH thực sự chuẩn — không phân biệt hoa/thường/không dấu
  useEffect(() => {
    const txt = normalize(search);

    const result = customers.filter(
      (c) =>
        normalize(c.name).includes(txt) || normalize(c.phone).includes(txt)
    );

    setFiltered(result);
  }, [search, customers]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Khách hàng</h1>

        <Link href="/khach-hang/them">
          <button className={styles.addButton}>+ Thêm khách hàng</button>
        </Link>
      </div>

      <p className={styles.subtitle}>
        Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
      </p>

      {/* Ô search */}
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Tìm theo tên, số điện thoại..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bảng khách hàng */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tên khách</th>
              <th>Số điện thoại</th>
              <th>Giới tính</th>
              <th>Tag</th>
              <th>Tổng chi tiêu</th>
              <th>Lần đến</th>
              <th>Gần nhất</th>
              <th>Nguồn</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.name}</strong>
                  <br />
                  <span className={styles.birthText}>
                    Sinh nhật: {c.birthday || "-"}
                  </span>
                </td>

                <td>{c.phone}</td>
                <td>{c.gender}</td>

                <td>
                  {c.tag ? (
                    <span className={styles.tag}>{c.tag}</span>
                  ) : (
                    "-"
                  )}
                </td>

                <td>{c.total_spent || 0} đ</td>
                <td>{c.visit_count || 0}</td>
                <td>{c.last_visit || "-"}</td>
                <td>{c.source || "-"}</td>

                <td>
                  <Link href={`/khach-hang/${c.id}`}>
                    <button className={styles.viewButton}>Xem</button>
                  </Link>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className={styles.noData}>
                  Không tìm thấy khách hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
