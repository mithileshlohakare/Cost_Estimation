export default function SummaryCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "linear-gradient(135deg, #ffffff, #f8fbff)",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    flex: 1,
    minWidth: "220px",
    border: "1px solid #e8eef7",
  },
  title: {
    margin: 0,
    fontSize: "15px",
    color: "#666",
    fontWeight: "500",
  },
  value: {
    marginTop: "12px",
    fontSize: "30px",
    fontWeight: "700",
    color: "#111827",
  },
};