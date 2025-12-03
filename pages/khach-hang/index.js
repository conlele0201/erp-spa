import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ Supabase (nếu bảng rỗng thì hiển thị mock data)
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("last_visit", { ascending: false });

        if (error) {
          console.error("Lỗi Supabase:", error.message);
        }

        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item.id,
            name: item.name,
            phone: item.phone,
            gender: item.gender,
            tag: item.tag,
            total_spent: item.total_spent,
            visits: item.visits,
            last_visit: item.last_visit,
          }));
          setCustomers(mapped);
        } else {
          // Mock data khi chưa có dữ liệu thật
          setCustomers([
            {
              id: 1,
              name: "Ngọc Anh",
              phone: "0901234567",
              gender: "Nữ",
              tag: "VIP",
              total_spent: "12,500,000đ",
              visits: 8,
              last_visit: "02/12/2025",
            },
            {
              id: 2,
              name: "Minh Khoa",
              phone: "0938765432",
              gender: "Nam",
              tag: "Khách mới",
              total_spent: "4,200,000đ",
              visits: 3,
              last_visit: "28/11/2025",
            },
            {
              id: 3,
              name: "Thu Hà",
              phone: "0912345789",
              gender: "Nữ",
              tag: "Khách quen",
              total_spent: "7,800,000đ",
              visits: 5,
              last_visit: "25/11/2025",
            },
          ]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-box">
          <div className="logo-placeholder" />
          <div className="logo-text">SPA LOGO</div>
        </div>

        <nav className="menu">
          <Link href="/" legacyBehavior>
            <a
              className={
                router.pathname === "/"
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              Dashboard
            </a>
          </Link>

          <Link href="/khach-hang" legacyBehavior>
            <a
              className={
                router.pathname === "/khach-hang"
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              Khách hàng
            </a>
          </Link>

          <button className="menu-item" type="button">
            Lịch hẹn
          </button>
          <button className="menu-item" type="button">
            Liệu trình
          </button>
          <button className="menu-item" type="button">
            Kho
          </button>
          <button className="menu-item" type="button">
            POS
          </button>
          <button className="menu-item" type="button">
            CSKH
          </button>
          <button className="menu-item" type="button">
            Báo cáo
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <div className="main-inner">
          <h1 className="page-title">Quản lý khách hàng</h1>

          {/* Thanh filter trên cùng */}
          <div className="toolbar">
            <input
              className="search-input"
              placeholder="Tìm theo tên hoặc số điện thoại..."
            />
            <select className="filter-select" defaultValue="all">
              <option value="all">Tất cả</option>
              <option value="vip">VIP</option>
              <option value="new">Khách mới</option>
              <option value="loyal">Khách quen</option>
            </select>
            <button className="add-button">+ Thêm khách hàng</button>
          </div>

          {/* Bảng khách hàng */}
          <div className="card">
            {loading ? (
              <div className="loading">Đang tải dữ liệu...</div>
            ) : (
              <table className="table">
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
                        <span className="tag-badge">{c.tag}</span>
                      </td>
                      <td>{c.total_spent}</td>
                      <td>{c.visits}</td>
                      <td>{c.last_visit}</td>
                      <td>
                        <button className="view-button">Xem</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .page {
          display: flex;
          min-height: 100vh;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          background: #f9fafb;
        }

        /* SIDEBAR */
        .sidebar {
          width: 260px;
          background: #ffd6e8;
          padding: 32px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .logo-box {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-placeholder {
          width: 140px;
          height: 160px;
          margin: 0 auto 12px;
          border-radius: 16px;
          background: #f4b1c8;
        }

        .logo-text {
          font-weight: 600;
          font-size: 16px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-item {
          display: block; /* để tràn full chiều ngang */
          width: 100%;
          padding: 10px 16px;
          border-radius: 12px;
          border: none;
          background: transparent;
          text-align: left;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          color: #222222;
          text-decoration: none; /* bỏ gạch chân của <a> */
          transition: background 0.15s ease, color 0.15s ease;
        }

        .menu-item:hover {
          background: #f4b1c8; /* MÀU HỒNG HOVER – giống Dashboard */
        }

        .menu-item.active {
          background: #f4b1c8; /* MÀU HỒNG ACTIVE – giống Dashboard */
        }

        /* MAIN */
        .main {
          flex: 1;
          padding: 32px;
          box-sizing: border-box;
        }

        .main-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 24px;
        }

        .toolbar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
          outline: none;
        }

        .search-input:focus {
          border-color: #f973b4;
          box-shadow: 0 0 0 1px #f973b4;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
          outline: none;
          background: #ffffff;
        }

        .add-button {
          padding: 10px 18px;
          border-radius: 999px;
          border: none;
          background: #f973b4;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .add-button:hover {
          background: #f759a5;
        }

        .card {
          background: #ffffff;
          border-radius: 24px;
          padding: 20px 24px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);
        }

        .loading {
          padding: 16px;
          font-size: 14px;
        }

        table.table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .table thead tr {
          background: #ffe2ee;
        }

        .table th,
        .table td {
          padding: 12px 10px;
          text-align: left;
          border-bottom: 1px solid #f1f5f9;
        }

        .tag-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: #ffd6e8;
          color: #a61b4c;
          font-size: 12px;
          font-weight: 600;
        }

        .view-button {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          font-size: 13px;
          cursor: pointer;
        }

        .view-button:hover {
          background: #f3f4f6;
        }

        @media (max-width: 1024px) {
          .page {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            flex-direction: row;
            align-items: center;
          }

          .logo-box {
            margin-bottom: 0;
            margin-right: 24px;
          }

          .menu {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .main {
            padding: 20px;
          }
        }
      </style>
    </div>
  );
}
