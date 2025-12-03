export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f7f7f9",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#F9D9E4",
          padding: "24px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            width: "140px",
            height: "140px",
            background: "#F3C1D8",
            borderRadius: "10px",
            margin: "0 auto",
          }}
        ></div>
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: 600,
          }}
        >
          SPA LOGO
        </p>

        {/* MENU */}
        <div style={{ marginTop: "30px" }}>
          {[
            { label: "Dashboard", link: "/" },
            { label: "Khách hàng", link: "/khach-hang" },
            { label: "Lịch hẹn", link: "#" },
            { label: "Liệu trình", link: "#" },
            { label: "Kho", link: "#" },
            { label: "POS", link: "#" },
            { label: "CSKH", link: "#" },
            { label: "Báo cáo", link: "#" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "6px",
                textDecoration: "none",
                fontWeight: 600,
                color: item.label === "Dashboard" ? "#000" : "#333",
                background:
                  item.label === "Dashboard" ? "#EFA6C3" : "transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "24px 32px" }}>
        {/* HEADER */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          ERP SPA Dashboard
        </h1>

        <div
          style={{
            background: "#f9fafc",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #eee",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Welcome to ERP SPA
          </h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Trang chủ hiển thị các widget, KPI, lịch hẹn và báo cáo nhanh của
            spa.
          </p>

          {/* KPI CARDS */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <KpiCard title="Khách hôm nay" value="24" />
            <KpiCard title="Doanh thu hôm nay" value="12,500,000đ" />
            <KpiCard title="Lịch hẹn sắp tới" value="8" />
          </div>

          {/* HÀNG 2: LỊCH HẸN & TÌNH TRẠNG PHÒNG */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Lịch hẹn hôm nay */}
            <div style={card}>
              <h3 style={cardTitle}>Lịch hẹn hôm nay</h3>
              <AppointmentRow
                time="09:00 – Ngọc Anh"
                service="Chăm sóc da mặt"
                staff="KT: Linh"
                status="Đang làm"
                statusColor="#c8f5d2"
                statusTextColor="#15803d"
              />
              <AppointmentRow
                time="10:30 – Thu Trang"
                service="Giảm béo bụng"
                staff="KT: Hà"
                status="Chờ"
                statusColor="#fef3c7"
                statusTextColor="#92400e"
              />
              <AppointmentRow
                time="13:00 – Trúc Ly"
                service="Điều trị mụn"
                staff="KT: Mai"
                status="Hoàn tất"
                statusColor="#dbeafe"
                statusTextColor="#1d4ed8"
              />
            </div>

            {/* Tình trạng phòng / giường */}
            <div style={card}>
              <h3 style={cardTitle}>Tình trạng phòng / giường</h3>
              <RoomRow name="Phòng 1" status="Đang sử dụng" />
              <RoomRow name="Phòng 2" status="Trống" />
              <RoomRow name="Phòng 3" status="Đang sử dụng" />
              <RoomRow name="Phòng 4" status="Đang vệ sinh" />
            </div>
          </div>

          {/* HÀNG 3: DOANH THU 7 NGÀY & TOP DỊCH VỤ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Doanh thu 7 ngày gần nhất */}
            <div style={card}>
              <h3 style={cardTitle}>Doanh thu 7 ngày gần nhất</h3>
              {[
                { label: "Hôm nay", value: "12,5M" },
                { label: "-1 ngày", value: "9,8M" },
                { label: "-2 ngày", value: "11,2M" },
                { label: "-3 ngày", value: "8,4M" },
                { label: "-4 ngày", value: "10,1M" },
                { label: "-5 ngày", value: "7,9M" },
                { label: "-6 ngày", value: "9,3M" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom:
                      idx === 6 ? "none" : "1px solid rgba(0,0,0,0.03)",
                    fontSize: "14px",
                  }}
                >
                  <span>{row.label}</span>
                  <span style={{ fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Top dịch vụ 7 ngày qua */}
            <div style={card}>
              <h3 style={cardTitle}>Top dịch vụ 7 ngày qua</h3>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={topServiceRow}>
                  Điều trị mụn chuyên sâu{" "}
                  <span style={topServiceCount}>18 lượt</span>
                </li>
                <li style={topServiceRow}>
                  Chăm sóc da cơ bản{" "}
                  <span style={topServiceCount}>15 lượt</span>
                </li>
                <li style={topServiceRow}>
                  Giảm béo vùng bụng{" "}
                  <span style={topServiceCount}>11 lượt</span>
                </li>
              </ol>
            </div>
          </div>

          {/* HÀNG 4: CSKH & CẢNH BÁO */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Nhắc CSKH */}
            <div style={card}>
              <h3 style={cardTitle}>Nhắc CSKH hôm nay</h3>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "14px" }}>
                <li>Gọi lại khách Thuỷ (sau điều trị 3 ngày)</li>
                <li>Nhắn tin nhắc liệu trình lần 3 cho khách Ngọc Hân</li>
                <li>Chúc mừng sinh nhật khách Minh Anh</li>
              </ul>
            </div>

            {/* Cảnh báo & thông báo */}
            <div style={card}>
              <h3 style={cardTitle}>Cảnh báo & thông báo</h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  fontSize: "14px",
                  color: "#b91c1c",
                }}
              >
                <li>Serum HA còn dưới 5 chai trong kho.</li>
                <li>2 khách còn công nợ chưa thanh toán đủ.</li>
                <li>
                  3 gói liệu trình sắp hết buổi, cần tư vấn gia hạn cho khách.
                </li>
              </ul>
            </div>
          </div>

          {/* HÀNG 5: THAO TÁC NHANH */}
          <div style={card}>
            <h3 style={cardTitle}>Thao tác nhanh</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                "Thêm khách hàng",
                "Tạo lịch hẹn",
                "Bán dịch vụ / gói",
                "Nhập kho nhanh",
              ].map((label, idx) => (
                <button key={idx} style={quickBtn}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS & STYLE */

function KpiCard({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "220px",
        background: "#fff",
        borderRadius: "12px",
        padding: "18px 20px",
        border: "1px solid #eee",
      }}
    >
      <p style={{ margin: 0, color: "#555" }}>{title}</p>
      <h2
        style={{
          margin: "10px 0 0",
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function AppointmentRow({ time, service, staff, status, statusColor, statusTextColor }) {
  return (
    <div
      style={{
        padding: "8px 0",
        borderBottom: "1px solid rgba(0,0,0,0.03)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{time}</div>
        <div style={{ color: "#555" }}>
          {service} • {staff}
        </div>
      </div>
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "999px",
          background: statusColor,
          color: statusTextColor,
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {status}
      </span>
    </div>
  );
}

function RoomRow({ name, status }) {
  return (
    <div
      style={{
        padding: "8px 0",
        borderBottom: "1px solid rgba(0,0,0,0.03)",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{name}</span>
      <span>{status}</span>
    </div>
  );
}

/* SHARED STYLE OBJECTS */

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "16px 18px",
  border: "1px solid #eee",
};

const cardTitle = {
  margin: "0 0 10px",
  fontSize: "16px",
  fontWeight: 700,
};

const topServiceRow = {
  marginBottom: "8px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
};

const topServiceCount = {
  fontWeight: 600,
};

const quickBtn = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
};
