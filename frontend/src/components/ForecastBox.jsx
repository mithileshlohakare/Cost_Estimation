export default function ForecastBox({ forecast }) {
  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>Forecast Overview</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.label}>Average Daily Cost</p>
          <h3 style={styles.value}>₹ {forecast.average_daily_cost}</h3>
        </div>
        <div style={styles.card}>
          <p style={styles.label}>Predicted 30-Day Cost</p>
          <h3 style={styles.value}>₹ {forecast.predicted_30_day_cost}</h3>
        </div>
      </div>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#f8fbff",
    borderRadius: "14px",
    padding: "18px",
    border: "1px solid #e8eef7",
  },
  label: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },
  value: {
    marginTop: "10px",
    fontSize: "24px",
    color: "#111827",
  },
};