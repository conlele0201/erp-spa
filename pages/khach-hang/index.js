// pages/khach-hang/index.js
import React from "react";
import Link from "next/link";
import styles from "./khachhang.module.css";

export default function KhachHangPage() {
  // Dữ liệu mẫu (sau sẽ thay bằng Supabase)
  const customers = [
    {
      id: 1,
      name: "Ngọc Anh",
      phone: "0901234567",
      gender: "Nữ",
      tag: "VIP",
      total: "12,500,000đ",
      visits: 8,
      last: "02/12/2025",
    },
    {
      id: 2,
      name: "Minh Khoa",
      phone: "0938765432",
      gender: "Nam",
      tag: "Khách mới",
      total: "4,200,000đ",
      visits: 3,
      last: "28/11/2025",
    },
    {
      id: 3,
      name: "Thu Hà",
      phone: "0912345789",
      gender: "Nữ",
      tag: "Khách quen",
      total: "7,800,000đ",
      visits: 5,
      last: "25/11/2025",
    },
  ];

  return (
    <div className={styles.page}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <div className={styles.logoBox}>
          <div className={styles.logoPlaceholder}></div>
          <div className={styles.logoText}>SPA LOGO</div>
        </div>

        <div className={styles.menu}>
          <Link href="/" className={styles.menuItem}>
            Dashboard
          </Link>

          <Link
            href="/khach-hang"
            className={`${styles.menuItem} ${styles.active}`}
          >
            Khách hàng
          </Link>

          <Link href="#" className={styles.menuItem}>
            Lịch hẹn
          </Link>

          <Link href="#" className={styles.menuItem}>
            Liệu trình
          </Link>

          <Link href="#" className={styles.menuItem}>
            Kho
          </Link>

          <Link href="#" className={styles.menuItem}>
            POS
          </Link>

          <Link href="#" className={styles.menuItem}>
            CSKH
          </Link>

          <Link href="#" className={styles.menuItem}>
            Báo cáo
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.main}>
        <h1 className={styles.title}>Quản lý khách hàng</h1>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <input
            className={styles.search}
            placeholder="Tìm theo tên hoặc số điện thoại..."
          />
          <select className={styles.select}>
            <option>Tất cả</option>
            <option>Nữ</option>
            <option>Nam</option>
          </select>

          <button className={styles.addBtn}>+ Thêm khách hàng</button>
        </div>

        {/* CARD + TABLE */}
        <div className={styles.card}>
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
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.gender}</td>
                  <td>
                    <span className={styles.tag}>{c.tag}</span>
                  </td>
                  <td>{c.total}</td>
                  <td>{c.visits}</td>
                  <td>{c.last}</td>
                  <td>
                    <button className={styles.viewBtn}>Xem</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
