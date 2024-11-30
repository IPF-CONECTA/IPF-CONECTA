import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { getPostsByMonth, getUsersByMonth } from "../services/statsServices";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const postsFetch = await getPostsByMonth();
const usersFetch = await getUsersByMonth();
const data = {
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  datasets: [
    {
      label: "Posts",
      data: postsFetch.data,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0,
    },
    {
      label: "Usuarios",
      data: usersFetch.data,
      fill: false,
      borderColor: "rgb(255, 150, 0)",
      tension: 0,
    },
  ],
};

const options = {
  responsive: true,
};

export const PostsByMonth = () => {
  return (
    <div className="border rounded-3 p-2" style={{ width: "49.5%" }}>
      <span className="fs-4">Usuarios y publicaciones nuevas por mes</span>
      <Line data={data} options={options} />
    </div>
  );
};
