import { useEffect, useState } from "react";
import { getSummary, getAnomalies, getForecast } from "../services/api";
import SummaryCard from "../components/SummaryCard";
import TopServices from "../components/TopServices";
import AnomalyList from "../components/AnomalyList";
import ForecastBox from "../components/ForecastBox";
import ServiceChart from "../components/ServiceChart";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const summaryRes = await getSummary();
      const anomalyRes = await getAnomalies();
      const forecastRes = await getForecast();

      setSummary(summaryRes.data);
      setAnomalies(anomalyRes.data);
      setForecast(forecastRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>Cloud Cost Leak Detector</h1>
          <p style={styles.subtext}>
            Monitor AWS spend, detect anomalies, and forecast future cloud costs.
          </p>
        </div>

        {summary && (
          <div style={styles.cardRow}>
            <SummaryCard title="Month Total" value={`₹ ${summary.month_total}`} />
            <SummaryCard title="Today Cost" value={`₹ ${summary.today_cost}`} />
            <SummaryCard title="Top Service Count" value={summary.top_services.length} />
          </div>
        )}

        {summary && <ServiceChart data={summary.top_services} />}

        <div style={styles.grid}>
          <div>
            {summary && <TopServices services={summary.top_services} />}
          </div>
          <div>
            {forecast && <ForecastBox forecast={forecast} />}
          </div>
        </div>

        {anomalies && <AnomalyList anomalies={anomalies} />}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%)",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    marginBottom: "28px",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "8px",
    color: "#111827",
  },
  subtext: {
    margin: 0,
    color: "#6b7280",
    fontSize: "16px",
  },
  cardRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
};