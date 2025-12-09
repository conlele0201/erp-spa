import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function KhachHangPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("customers")
        .select(
          "id, name, phone, gender, tag, total_spent, visits, last_visit, birthday, source"
        );

      if (!error) setCustomers(data);
      setLoading(false);
    }
    load();
  }, []);

  const formatDateShort = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d)) return "-";
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const formatDateFull = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d)) return "-";
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const money = (v) =>
    v ? Number(v).toLocaleString("vi-VN") + " đ" : "0 đ";

  return (
    <div
      style={{
        padding: "32px 40px",
        background: "#f5f5f7",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
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
            onClick={() => (window.location.href = "/khach-hang/them")}
            style={{
              padding: "12px 24px",
              background: "#fbbf24",
              borderRadius: 999,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(251,191,36,0.45)",
            }}
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <input
            placeholder="Tìm theo tên, số điện thoại..."
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
            }}
          />
          <select
            style={{
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
            }}
          >
            <option>Tất cả tag</option>
          </select>

          <select
            style={{
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
            }}
          >
            <option>Tất cả nguồn khách</option>
          </select>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1.6fr 1.2fr 0.8fr 1fr 1fr 0.8fr 1fr 0.9fr",
              padding: "14px 24px",
              background: "#fef3c7",
              fontWeight: 600,
              fontSize: 13,
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
            <span style={{ textAlign: "right" }}>Thao tác</span>
          </div>

          {!loading &&
            customers.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1.6fr 1.2fr 0.8fr 1fr 1fr 0.8fr 1fr 0.9fr",
                  padding: "16px 24px",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div>
                  <strong>{c.name}</strong>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Sinh nhật: {formatDateShort(c.birthday)}
                  </div>
                </div>

                <span>{c.phone}</span>
                <span>{c.gender === "male" ? "Nam" : "Nữ"}</span>

                <span>
                  {c.tag ? (
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
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
                      }}
                    >
                      {c.tag}
                    </span>
                  ) : (
                    "-"
                  )}
                </span>

                <span>{money(c.total_spent)}</span>
                <span>{c.visits || 0}</span>
                <span>{formatDateFull(c.last_visit)}</span>

                <div style={{ textAlign: "right" }}>
                  <button
                    style={{
                      padding: "6px 16px",
                      borderRadius: 999,
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Trang chi tiết sẽ làm sau")}
                  >
                    Xem
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
