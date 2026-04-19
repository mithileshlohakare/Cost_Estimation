export default function AnomalyList({ anomalies }) {
  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>Detected Anomalies</h2>
      {anomalies.length === 0 ? (
        <p>No anomalies found</p>
      ) : (
        <div>
          {anomalies.map((item, index) => (
            <div key={index} style={styles.item}>
              <div style={styles.row}>
                <span style={styles.label}>Service</span>
                <span>{item.service}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Date</span>
                <span>{item.date}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Actual Cost</span>
                <span>₹ {item.actual_cost}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Expected Cost</span>
                <span>₹ {item.expected_cost}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Severity</span>
                <span style={item.severity === "high" ? styles.high : styles.medium}>
                  {item.severity}
                </span>
              </div>
              <div style={styles.reasonBox}>
                <strong>Reason:</strong> {item.reason}
              </div>
            </div>
          ))}
        </div>
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
  item: {
    border: "1px solid #eef2f7",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "14px",
    background: "#fafcff",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
  },
  label: {
    color: "#6b7280",
    fontWeight: "500",
  },
  high: {
    color: "#b91c1c",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  medium: {
    color: "#d97706",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  reasonBox: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
    background: "#f3f7fb",
    color: "#374151",
  },
};