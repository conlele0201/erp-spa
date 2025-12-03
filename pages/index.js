export default function Home() {
  const [activeMenu, setActiveMenu] = React.useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Khách hàng",
    "Lịch hẹn",
    "Liệu trình",
    "Kho",
    "POS",
    "CSKH",
    "Báo cáo",
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "300px",
          background: "#f9dce6",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "1px solid #eee",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <div style={{ padding: "30px 0" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "#e8a8c0",
              borderRadius: "10px",
              margin: "0 auto",
            }}
          ></div>
          <p
            style={{
              marginTop: "10px",
              fontWeight: "600",
              textAlign: "center",
              fontSize: "16px",
              color: "#333",
            }}
          >
            SPA LOGO
          </p>
        </div>

        {/* MENU */}
        <nav style={{ width: "100%", padding: 0, marginTop: "10px" }}>
          {menuItems.map((label) => {
            const isActive = activeMenu === label;
            return (
              <div
                key={label}
                onClick={() => setActiveMenu(label)}
                style={{
                  width: "100%",
                  padding: "15px 25px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  background: isActive ? "#e8a8c0" : "transparent",
                  color: "#333",
                  transition: "0.15s",
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#f4c7d9";
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background =
                    "transparent";
                }}
              >
                {label}
              </div>
            );
          })}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#f7f7f7", overflow: "auto" }}>
        {/* HEADER */}
        <div
          style={{
            background: "#fff",
            padding: "20px 30px",
            fontSize: "28px",
            fontWeight: "700",
            borderBottom: "1px solid #eee",
          }}
        >
          ERP SPA Dashboard
        </div>

        {/* CONTENT BODY */}
        <div style={{ padding: "30px" }}>
          <h2 style={{ marginBottom: "10px" }}>Welcome to ERP SPA</h2>
          <p style={{ marginBottom: "30px", color: "#666" }}>
            Trang chủ hiển thị các widget, KPI, thông báo và báo cáo nhanh của
            spa.
          </p>

          {/* KPI ROW */}
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {/* Widget */}
            <div
              style={{
                background: "#fff",
                flex: 1,
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            >
              <p style={{ color: "#666", marginBottom: "10px" }}>
                Khách hôm nay
              </p>
              <h2 style={{ fontSize: "28px", fontWeight: "700" }}>24</h2>
            </div>

            <div
              style={{
                background: "#fff",
                flex: 1,
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            >
              <p style={{ color: "#666", marginBottom: "10px" }}>
                Doanh thu hôm nay
              </p>
              <h2 style={{ fontSize: "28px", fontWeight: "700" }}>
                12,500,000đ
              </h2>
            </div>

            <div
              style={{
                background: "#fff",
                flex: 1,
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            >
              <p style={{ color: "#666", marginBottom: "10px" }}>
                Lịch hẹn sắp tới
              </p>
              <h2 style={{ fontSize: "28px", fontWeight: "700" }}>8</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
