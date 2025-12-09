import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./khachhang.module.css"; // ⭐ giữ layout gốc

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("customers")
        .select(
          "id, name, phone, gender, tag, total_spent, visits, last_visit, birthday, source"
        );

      if (!error) {
        setCustomers(data);
        setFiltered(data);
      }
    }
    load();
  }, []);

  // ⭐ SEARCH FILTER
  useEffect(() => {
    const term = search.toLowerCase();
    const result = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.phone.includes(term)
    );
    setFiltered(result);
  }, [search, customers]);

  const shortDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (isNaN(dt)) return "-";
    return `${String(dt.getDate()).padStart(2, "0")}/${String(
      dt.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const money = (v) =>
    v ? Number(v).toLocaleString("vi-VN") + " đ" : "0 đ";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inner}>

        {/* HEADER */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Khách hàng</h1>
            <p className={styles.subtitle}>
              Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
            </p>
          </div>

          {/* ⭐ BUTTON ĐÚNG GỐC */}
          <button
            className={styles.addButton}
            onClick={() => (window.location.href = "/khach-hang/them")}
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className={styles.filterRow}>
          <input
            className={styles.searchInput}
            placeholder="Tìm theo tên, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className={styles.filterSelect}>
            <option>Tất cả tag</option>
          </select>

          <select className={styles.filterSelect}>
            <option>Tất cả nguồn khách</option>
          </select>
        </div>

        {/* TABLE */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span>Tên khách</span>
            <span>Số điện thoại</span>
            <span>Giới tính</span>
            <span>Tag</span>
            <span>Tổng chi tiêu</span>
            <span>Lần đến</span>
            <span>Gần nhất</span>
            <span style={{ textAlign: "right" }}>Thao tác</span>
          </div>

          {filtered.map((c) => (
            <div key={c.id} className={styles.tableRow}>
              <div>
                <strong>{c.name}</strong>
                <div className={styles.birthdayText}>
                  Sinh nhật: {shortDate(c.birthday)}
                </div>
              </div>

              <span>{c.phone}</span>
              <span>{c.gender === "male" ? "Nam" : "Nữ"}</span>

              {/* TAG BADGE */}
              <span>
                {c.tag ? (
                  <span className={styles.tagBadge}>{c.tag}</span>
                ) : (
                  "-"
                )}
              </span>

              <span>{money(c.total_spent)}</span>
              <span>{c.visits || 0}</span>
              <span>-</span>

              <div style={{ textAlign: "right" }}>
                <button className={styles.viewButton}>Xem</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
