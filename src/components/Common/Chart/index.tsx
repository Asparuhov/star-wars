// components/Common/Chart.js
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IChartProps } from "types/common";

const Chart: React.FC<IChartProps> = ({ currency, exchangeRates }) => {
  const [chartData, setChartData] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedRate = exchangeRates[currency].toFixed(2); // Format to two decimal places
      setChartData((prevData) => [...prevData, formattedRate]);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [currency, exchangeRates]);

  const numericData = chartData.map((value) => parseFloat(value));

  const options: ReactApexChart["props"]["options"] = {
    chart: {
      id: "real-time-chart",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 2000,
        },
      },
      background: "#1976d2",
      width: 400,
    },
    xaxis: {
      categories: numericData.map((_, index) => index.toString()),
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#fff", // Set the color to white
      },
    },
  };

  return (
    <ReactApexChart
      type="line"
      options={options}
      series={[{ name: currency, data: numericData }]}
    />
  );
};

export default Chart;
