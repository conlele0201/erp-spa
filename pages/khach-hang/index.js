// pages/khach-hang/index.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Mock data dùng khi:
// - Mới khởi tạo dự án
// - Hoặc Supabase chưa cấu hình / chưa có dữ liệu
const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: "Ngọc Anh",
    phone: "0901234567",
    gender: "Nữ",
    tag: "VIP",
    totalSpend: "12,500,000đ",
    visits: 8,
    lastVisit: "02/12/2025",
  },
  {
    id: 2,
    name: "Minh Khoa",
    phone: "0938765432",
    gender: "Nam",
    tag: "Khách mới",
    totalSpend: "4,200,000đ",
    visits: 3,
    lastVisit: "28/11/2025",
  },
  {
    id: 3,
    name: "Thu Hà",
    phone: "0912345789",
    gender: "Nữ",
    tag: "Khách quen",
    totalSpend: "7,800,000đ",
    visits: 5,
    lastVisit: "25/11/2025",
  },
];

export default function KhachHangPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nếu chưa có supabase client (thiếu env) thì dùng luôn MOCK_CUSTOMERS
    if (!supabase) {
      console.warn("Supabase client không khả dụng, dùng mock data.");
      setLoading(false);
      return;
    }

    async function fetchCustomers() {
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .order("last_visit", { ascending: false });

        if (error) {
          console.error("Supabase error:", error.message);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const mapped = data.map((row) => ({
            id: row.id,
            name: row.name,
            phone: row.phone,
            gender: row.gender,
            tag: row.tag,
            totalSpend: row.total_spend, // hoặc format lại nếu cần
            visits: row.total_visits,
            lastVisit: row.last_visit,
          }));
          setCustomers(mapped);
        }

        setLoading(false);
      } catch (err) {
        console.error("Unexpected error when fetching customers:", err);
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: "24px 40px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        Quản lý khách hàng
      </h1>

      {/* Thanh search + filter + button thêm khách */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <select
          style={{
            width: "140px",
            padding: "10px 14px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
          }}
        >
          <option>Tất cả</option>
          <option>VIP</option>
          <option>Khách mới</option>
          <option>Khách quen</option>
        </select>
        <button
          style={{
            padding: "10px 18px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#ec4899",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Thêm khách hàng
        </button>
      </div>

      {/* Bảng khách hàng */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "20px 24px",
          boxShadow: "0 10px 40px rgba(15, 23, 42, 0.05)",
        }}
      >
        {loading ? (
          <p>Đang tải dữ liệu khách hàng...</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#ffe4ef",
                  textAlign: "left",
                  height: "44px",
                }}
              >
                <th style={{ padding: "0 16px", borderRadius: "12px 0 0 12px" }}>
                  Tên khách
                </th>
                <th style={{ padding: "0 16px" }}>Số điện thoại</th>
                <th style={{ padding: "0 16px" }}>Giới tính</th>
                <th style={{ padding: "0 16px" }}>Tag</th>
                <th style={{ padding: "0 16px" }}>Tổng chi tiêu</th>
                <th style={{ padding: "0 16px" }}>Lần đến</th>
                <th style={{ padding: "0 16px" }}>Gần nhất</th>
                <th
                  style={{
                    padding: "0 16px",
                    borderRadius: "0 12px 12px 0",
                    textAlign: "center",
                  }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer.id || index}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    height: "56px",
                  }}
                >
                  <td style={{ padding: "0 16px" }}>{customer.name}</td>
                  <td style={{ padding: "0 16px" }}>{customer.phone}</td>
                  <td style={{ padding: "0 16px" }}>{customer.gender}</td>
                  <td style={{ padding: "0 16px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#ffe4ef",
                        color: "#be185d",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {customer.tag}
                    </span>
                  </td>
                  <td style={{ padding: "0 16px" }}>{customer.totalSpend}</td>
                  <td style={{ padding: "0 16px" }}>{customer.visits}</td>
                  <td style={{ padding: "0 16px" }}>
                    {customer.lastVisit || "-"}
                  </td>
                  <td style={{ padding: "0 16px", textAlign: "center" }}>
                    <button
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
