// pages/khach-hang/index.js
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "./khachhang.module.css";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Lấy dữ liệu từ Supabase
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        if (!supabase) {
          setErrorMsg(
            "Không kết nối được Supabase (supabase client chưa được khởi tạo)."
          );
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setCustomers(data || []);
      } catch (err) {
        console.error("Lỗi tải customers:", err);
        setErrorMsg("Có lỗi khi tải danh sách khách hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Format helper
  const formatBirthday = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const day = d.getDate();
    const month = d.getMonth() + 1;
    return `${day}/${month}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "-";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value) => {
    const number = Number(value || 0);
    if (!Number.isFinite(number)) return "0 đ";
    return new Intl.NumberFormat("vi-VN").format(number) + " đ";
  };

  // Lọc theo search + tag + nguồn
  const filteredCustomers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return customers.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const phone = (c.phone || "").toLowerCase();
      const tag = (c.tag || "").toLowerCase();
      const source = (c.source || "").toLowerCase();

      // search theo tên + số điện thoại
      if (term && !name.includes(term) && !phone.includes(term)) {
        return false;
      }

      if (tagFilter !== "all" && tag !== tagFilter.toLowerCase()) {
        return false;
      }

      if (sourceFilter !== "all" && source !== sourceFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [customers, searchTerm, tagFilter, sourceFilter]);

  // Lấy danh sách tag & nguồn từ data thật để fill dropdown
  const tagOptions = useMemo(() => {
    const set = new Set();
    customers.forEach((c) => {
      if (c.tag) set.add(c.tag);
    });
    return Array.from(set);
  }, [customers]);

  const sourceOptions = useMemo(() => {
    const set = new Set();
    customers.forEach((c) => {
      if (c.source) set.add(c.source);
    });
    return Array.from(set);
  }, [customers]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Khách hàng</h1>
        <p className={styles.pageSubtitle}>
          Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
        </p>
      </div>

      {/* Hàng search + filter + nút thêm */}
      <div className={styles.toolbarRow}>
        <input
          type="text"
          placeholder="Tìm theo tên, số điện thoại..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className={styles.filterSelect}
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="all">Tất cả tag</option>
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="all">Tất cả nguồn khách</option>
          {sourceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <Link href="/khach-hang/them">
          <button
            className={styles.addButton}
            style={{
              // THU NHỎ nút cho đỡ to đùng
              padding: "10px 26px",
              fontSize: "16px",
              height: "48px",
              borderRadius: "999px",
            }}
          >
            + Thêm khách hàng
          </button>
        </Link>
      </div>

      {/* Thông báo lỗi / loading */}
      {loading && <p className={styles.infoText}>Đang tải danh sách...</p>}
      {errorMsg && !loading && (
        <p className={styles.errorText}>{errorMsg}</p>
      )}

      {/* Bảng khách hàng */}
      {!loading && !errorMsg && (
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeaderRow}>
            <div className={styles.colName}>Tên khách</div>
            <div className={styles.colPhone}>Số điện thoại</div>
            <div className={styles.colGender}>Giới tính</div>
            <div className={styles.colTag}>Tag</div>
            <div className={styles.colTotal}>Tổng chi tiêu</div>
            <div className={styles.colVisits}>Lần đến</div>
            <div className={styles.colLast}>Gần nhất</div>
            <div className={styles.colSource}>Nguồn</div>
            <div className={styles.colActions}>Thao tác</div>
          </div>

          {filteredCustomers.map((c) => (
            <div key={c.id} className={styles.tableRow}>
              <div className={styles.colName}>
                <div className={styles.customerName}>{c.name}</div>
                <div className={styles.customerBirthday}>
                  {c.birthday ? `Sinh nhật: ${formatBirthday(c.birthday)}` : ""}
                </div>
              </div>

              <div className={styles.colPhone}>{c.phone || "-"}</div>
              <div className={styles.colGender}>{c.gender || "-"}</div>

              <div className={styles.colTag}>
                {c.tag ? (
                  <span className={styles.tagBadge}>{c.tag}</span>
                ) : (
                  "-"
                )}
              </div>

              <div className={styles.colTotal}>
                {formatCurrency(c.total_spent)}
              </div>

              <div className={styles.colVisits}>{c.visits || 0}</div>

              <div className={styles.colLast}>
                {c.last_visit ? formatDate(c.last_visit) : "-"}
              </div>

              <div className={styles.colSource}>{c.source || "-"}</div>

              <div className={styles.colActions}>
                <button className={styles.viewButton}>Xem</button>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className={styles.emptyState}>
              Không tìm thấy khách hàng nào phù hợp.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
