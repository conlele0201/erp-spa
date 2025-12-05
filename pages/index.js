// pages/index.js

export default function DashboardPage() {
  const todayAppointments = [
    {
      time: "09:00 – Ngọc Anh",
      service: "Chăm sóc da mặt • KT: Linh",
      status: "Đang làm",
      statusColor: "#22c55e",
      statusTextColor: "#ffffff",
    },
    {
      time: "10:30 – Thu Trang",
      service: "Giảm béo bụng • KT: Hà",
      status: "Chờ",
      statusColor: "#fbbf24",
      statusTextColor: "#000000",
    },
    {
      time: "13:00 – Trúc Ly",
      service: "Điều trị mụn • KT: Mai",
      status: "Hoàn tất",
      statusColor: "#3b82f6",
      statusTextColor: "#ffffff",
    },
  ];

  const roomStatus = [
    { name: "Phòng 1", status: "Đang sử dụng" },
    { name: "Phòng 2", status: "Trống" },
    { name: "Phòng 3", status: "Đang sử dụng" },
    { name: "Phòng 4", status: "Đang vệ sinh" },
  ];

  return (
    <div>
      {/* Tiêu đề */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        ERP SPA Dashboard
      </h1>

      {/* Welcome + 3 ô KPI */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 24,
          padding: 24,
          marginBottom: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Welcome to ERP SPA
        </h2>
        <p
          style={{
            marginBottom: 24,
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          Trang chủ hiển thị các widget, KPI, lịch hẹn và báo cáo nhanh của spa.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {/* KPI 1 */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 18,
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              Khách hôm nay
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              24
            </p>
          </div>

          {/* KPI 2 */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 18,
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              Doanh thu hôm nay
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              12,500,000đ
            </p>
          </div>

          {/* KPI 3 */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 18,
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              Lịch hẹn sắp tới
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              8
            </p>
          </div>
        </div>
      </div>

      {/* 2 cột: Lịch hẹn hôm nay + Tình trạng phòng */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.4fr",
          gap: 24,
        }}
      >
        {/* Lịch hẹn hôm nay */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Lịch hẹn hôm nay
          </h3>

          <div>
            {todayAppointments.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom:
                    idx === todayAppointments.length - 1
                      ? "none"
                      : "1px solid #f3f4f6",
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {item.time}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                    }}
                  >
                    {item.service}
                  </p>
                </div>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: item.statusColor,
                    color: item.statusTextColor,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tình trạng phòng / giường */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Tình trạng phòng / giường
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <tbody>
              {roomStatus.map((room, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: 500,
                    }}
                  >
                    {room.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      textAlign: "right",
                      color:
                        room.status === "Trống" ? "#22c55e" : "#111827",
                    }}
                  >
                    {room.status}
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
