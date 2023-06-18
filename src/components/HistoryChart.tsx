import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useParams } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

type PriceData = {
  name: string;
  prices: number[][];
};

const HistoryChart: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();
        setPriceData(data);
      } catch (error) {
        console.error("Error fetching price history:", error);
      }
    };

    fetchPriceHistory();
  }, []);

  const coinChartData = priceData?.prices.map((value: number[]) => ({
    x:  moment(value[0]).format("MMM DD"),
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: coinChartData?.map((value) => value.x) || [],
    datasets: [
      {
        fill: true,
        label: priceData?.name || '',
        data: coinChartData?.map((value) => value.y) || [],
        borderColor: 'rgb(194, 0, 247)',
        backgroundColor: 'rgba(194, 0, 247, 0.2)'
      },
    ],
  };

  return (
    <div>
      {coinChartData ? (
        <Line options={options} data={data}/>
      ) : (
        <p>Loading price history chart...</p>
      )}
    </div>
  );
};

export default HistoryChart;
