import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getSkillsTrend } from "../services/statsServices";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SkillsTrend = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSkillsTrend();
      if (res.status == 200) {
        setData(res.data);
      }
    };

    fetchData();
  }, []);
  const labels = data && Object.keys(data);
  const values = data && Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Trabajos",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="border rounded-3 p-2 w-50" style={{ width: "49%" }}>
      <span className="fs-4">Habilidades más solicitadas</span>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SkillsTrend;
