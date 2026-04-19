export default function TopServices({ services }) {
  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>Top Services</h2>
      {services.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul style={styles.list}>
          {services.map((item, index) => (
            <li key={index} style={styles.item}>
              <span style={styles.serviceName}>{item.service}</span>
              <strong style={styles.cost}>₹ {item.cost}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  box: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    marginTop: "20px",
    border: "1px solid #e8eef7",
  },
  heading: {
    marginBottom: "16px",
    color: "#111827",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eef2f7",
  },
  serviceName: {
    color: "#374151",
    fontWeight: "500",
  },
  cost: {
    color: "#111827",
  },
};