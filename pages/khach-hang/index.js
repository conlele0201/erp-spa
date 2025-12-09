// pages/khach-hang/index.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./khachhang.module.css";

export default function KhachHang() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setCustomers(data);
    }
  }

  const filtered = customers.filter((c) => {
    const s = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(s) ||
      c.phone?.toLowerCase().includes(s)
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Khách hàng</h1>
      <p className={styles.subtitle}>
        Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
      </p>

      <div className={styles.topBar}>
        <input
          className={styles.search}
          placeholder="Tìm theo tên, số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className={styles.filter}>
          <option>Tất cả tag</option>
        </select>

        <select className={styles.filter}>
          <option>Tất cả nguồn khách</option>
        </select>

        <button className={styles.addButton}>+ Thêm khách hàng</button>
      </div>

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
                  <span className={styles.birthday}>
                    Sinh nhật: {c.birthday || "--"}
                  </span>
                </td>

                <td>{c.phone}</td>
                <td>{c.gender}</td>

                <td>
                  <span className={`${styles.tag} ${styles.tagVip}`}>
                    {c.tag}
                  </span>
                </td>

                <td>{c.total_spent || 0} đ</td>
                <td>{c.visit_count || 0}</td>
                <td>{c.last_visit || "-"}</td>
                <td>{c.source || "-"}</td>

                <td>
                  <button className={styles.viewBtn}>Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
