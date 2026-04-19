from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
CSV_PATH = BASE_DIR / "data" / "aws_costs.csv"


def load_data():
    df = pd.read_csv(CSV_PATH)
    df["date"] = pd.to_datetime(df["date"])
    df["cost"] = df["cost"].astype(float)
    return df


@app.get("/")
def home():
    return {"message": "Cloud Cost Leak Detector backend is running"}


@app.get("/summary")
def get_summary():
    df = load_data()

    month_total = round(df["cost"].sum(), 2)

    service_summary = (
        df.groupby("service")["cost"]
        .sum()
        .reset_index()
        .sort_values(by="cost", ascending=False)
    )

    top_services = service_summary.head(5).to_dict(orient="records")

    latest_date = df["date"].max()
    today_cost = round(df[df["date"] == latest_date]["cost"].sum(), 2)

    return {
        "month_total": month_total,
        "today_cost": today_cost,
        "top_services": top_services
    }


@app.get("/anomalies")
def get_anomalies():
    df = load_data()

    anomalies = []

    # Rule 1: Any AWS Lambda cost >= 400 is anomaly
    lambda_df = df[(df["service"] == "AWS Lambda") & (df["cost"] >= 400)]

    for _, row in lambda_df.iterrows():
        anomalies.append({
            "date": row["date"].strftime("%Y-%m-%d"),
            "service": row["service"],
            "actual_cost": round(row["cost"], 2),
            "expected_cost": 250.0,
            "severity": "high",
            "reason": "High Lambda cost spike detected"
        })

    # Rule 2: Generic spike detection for all services
    daily_service_cost = (
        df.groupby(["date", "service"])["cost"]
        .sum()
        .reset_index()
        .sort_values(by=["service", "date"])
    )

    for service in daily_service_cost["service"].unique():
        service_df = daily_service_cost[daily_service_cost["service"] == service].copy()
        service_df = service_df.sort_values("date").reset_index(drop=True)

        for i in range(1, len(service_df)):
            prev_cost = service_df.loc[i - 1, "cost"]
            curr_cost = service_df.loc[i, "cost"]

            if prev_cost > 0 and curr_cost > prev_cost * 1.4:
                anomalies.append({
                    "date": service_df.loc[i, "date"].strftime("%Y-%m-%d"),
                    "service": service,
                    "actual_cost": round(curr_cost, 2),
                    "expected_cost": round(prev_cost, 2),
                    "severity": "medium",
                    "reason": "Sudden spike compared to previous day"
                })

    return anomalies


@app.get("/forecast")
def get_forecast():
    df = load_data()

    daily_total = (
        df.groupby("date")["cost"]
        .sum()
        .reset_index()
        .sort_values(by="date")
    )

    avg_daily_cost = daily_total["cost"].mean()
    predicted_30_day_cost = round(avg_daily_cost * 30, 2)

    return {
        "average_daily_cost": round(avg_daily_cost, 2),
        "predicted_30_day_cost": predicted_30_day_cost
    }