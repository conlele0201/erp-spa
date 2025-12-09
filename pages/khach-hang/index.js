import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./khachhang.module.css";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format tiền
  const formatMoney = (num) => {
    if (!num) return "0 đ";
    return num.toLocaleString("vi-VN") + " đ";
  };

  // Format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("vi-VN");
  };

  // Load data từ Supabase
  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert("Không tải được dữ liệu khách hàng.");
    } else {
      setCustomers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Khách hàng</h1>
      <p className={styles.pageSubtitle}>
        Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
      </p>

      <button
        className={styles.addButton}
        onClick={() => (window.location.href = "/khach-hang/them")}
      >
        + Thêm khách hàng
      </button>

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
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: 20 }}>
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                    <div className={styles.birthText}>
                      Sinh nhật: {formatDate(c.birthday)}
                    </div>
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

                  <td>{formatMoney(c.total_spent || 0)}</td>
                  <td>{c.visits || 0}</td>
                  <td>{formatDate(c.last_visit)}</td>
                  <td>{c.source || "-"}</td>

                  <td>
                    <button
                      className={styles.viewBtn}
                      onClick={() => alert("Chức năng xem chi tiết sẽ làm sau")}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
