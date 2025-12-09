// pages/khach-hang/index.js

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu thật từ bảng customers
  useEffect(() => {
    async function fetchCustomers() {
      try {
        if (!supabase) {
          console.warn("Supabase client is not initialized");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("customers")
          .select(
            "id, name, phone, gender, tag, total_spent, visits, last_visit, birthday, source"
          )
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching customers:", error);
          setCustomers([]);
        } else {
          setCustomers(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return "0 đ";
    try {
      return (
        Number(value).toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }) + " đ"
      );
    } catch {
      return value + " đ";
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "-";
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatBirthdayShort = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "-";
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const getGenderLabel = (gender) => {
    if (!gender) return "";
    switch (gender) {
      case "female":
      case "nữ":
      case "Nữ":
        return "Nữ";
      case "male":
      case "nam":
      case "Nam":
        return "Nam";
      default:
        return "Khác";
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: "32px 40px",
          background: "#f5f5f7",
          minHeight: "100vh",
        }}
      >
        {/* TIÊU ĐỀ + MÔ TẢ */}
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  margin: 0,
                  color: "#111827",
                }}
              >
                Khách hàng
              </h1>
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 24,
                  color: "#6b7280",
                  fontSize: 14,
                }}
              >
                Quản lý hồ sơ khách hàng, lịch sử đến spa và phân loại chăm sóc.
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/khach-hang/them";
              }}
              style={{
                alignSelf: "flex-start",
                padding: "12px 22px",
                borderRadius: 999,
                border: "none",
                background: "#fbbf24",
                boxShadow: "0 10px 25px rgba(251,191,36,0.4)",
                color: "#111827",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              + Thêm khách hàng
            </button>
          </div>

          {/* THANH TÌM KIẾM + FILTER (tạm thời chỉ là layout, chưa cần chạy) */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 20,
              marginTop: 4,
            }}
          >
            <input
              placeholder="Tìm theo tên, số điện thoại..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                outline: "none",
                fontSize: 14,
                background: "#fff",
              }}
            />
            <select
              style={{
                width: 160,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: "#fff",
                fontSize: 14,
              }}
              defaultValue="all-tags"
            >
              <option value="all-tags">Tất cả tag</option>
            </select>
            <select
              style={{
                width: 190,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: "#fff",
                fontSize: 14,
              }}
              defaultValue="all-sources"
            >
              <option value="all-sources">Tất cả nguồn khách</option>
            </select>
          </div>

          {/* BẢNG KHÁCH HÀNG */}
          <div
            style={{
              marginTop: 4,
              background: "#ffffff",
              borderRadius: 24,
              boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
              overflow: "hidden",
            }}
          >
            {/* HEADER HÀNG TIÊU ĐỀ */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(200px, 1.8fr) 1.2fr 0.8fr 1fr 1.1fr 0.8fr 1.1fr 1fr 0.9fr",
                padding: "14px 24px",
                background: "#fef3c7",
                borderBottom: "1px solid #feecc5",
                fontSize: 13,
                fontWeight: 600,
                color: "#4b5563",
              }}
            >
              <span>Tên khách</span>
              <span>Số điện thoại</span>
              <span>Giới tính</span>
              <span>Tag</span>
              <span>Tổng chi tiêu</span>
              <span>Lần đến</span>
              <span>Gần nhất</span>
              <span>Nguồn</span>
              <span style={{ textAlign: "right" }}>Thao tác</span>
            </div>

            {/* NỘI DUNG */}
            {loading ? (
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: 14,
                }}
              >
                Đang tải danh sách khách hàng...
              </div>
            ) : customers.length === 0 ? (
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: 14,
                }}
              >
                Chưa có khách hàng nào. Hãy bấm{" "}
                <strong>“Thêm khách hàng”</strong> để tạo mới.
              </div>
            ) : (
              customers.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(200px, 1.8fr) 1.2fr 0.8fr 1fr 1.1fr 0.8fr 1.1fr 1fr 0.9fr",
                    padding: "16px 24px",
                    borderTop: "1px solid #f3f4f6",
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  {/* Tên + sinh nhật rút gọn */}
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        marginBottom: 2,
                      }}
                    >
                      {c.name || "-"}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >
                      Sinh nhật: {formatBirthdayShort(c.birthday)}
                    </div>
                  </div>

                  <div>{c.phone || "-"}</div>

                  <div>{getGenderLabel(c.gender)}</div>

                  {/* Tag chip */}
                  <div>
                    {c.tag ? (
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 999,
                          background:
                            c.tag === "VIP"
                              ? "#fee2e2"
                              : c.tag === "Khách quen"
                              ? "#dcfce7"
                              : "#e0f2fe",
                          color:
                            c.tag === "VIP"
                              ? "#b91c1c"
                              : c.tag === "Khách quen"
                              ? "#166534"
                              : "#075985",
                          fontSize: 12,
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {c.tag}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>

                  <div>{formatCurrency(c.total_spent)}</div>

                  <div>{c.visits || 0}</div>

                  <div>{formatDate(c.last_visit)}</div>

                  <div>{c.source || "-"}</div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      style={{
                        padding: "6px 16px",
                        borderRadius: 999,
                        border: "1px solid #e5e7eb",
                        background: "#fff",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Tạm thời chưa có trang chi tiết, để sau làm
                        alert("Chức năng xem chi tiết sẽ làm ở bước sau.");
                      }}
                    >
                      Xem
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
