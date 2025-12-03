function menuItem(label, activeMenu, setActiveMenu) {
  return (
    <div
      onClick={() => setActiveMenu(label)}
      style={{
        padding: "14px 16px",
        fontWeight: "600",
        color: "#333",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.25s",
        width: "100%",           // 🔥 Tràn full ngang menu
        boxSizing: "border-box", // 🔥 Không dư mép
        background:
          activeMenu === label ? "#e8a8c0" : "transparent"
      }}
      onMouseOver={(e) => {
        if (activeMenu !== label) e.currentTarget.style.background = "#f4c7d9";
      }}
      onMouseOut={(e) => {
        if (activeMenu !== label) e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </div>
  );
}
