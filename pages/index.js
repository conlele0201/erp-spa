export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "700" }}>ERP SPA Dashboard</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #eee",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>
          Welcome to ERP SPA
        </h2>
        <p>Trang chủ hiển thị các widget, KPI, lịch hẹn và báo cáo nhanh của spa.</p>

        {/* WIDGETS */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <p>Khách hôm nay</p>
            <h2>24</h2>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <p>Doanh thu hôm nay</p>
            <h2>12,500,000đ</h2>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          >
            <p>Lịch hẹn sắp tới</p>
            <h2>8</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
