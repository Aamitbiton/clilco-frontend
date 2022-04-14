import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function EmotionsChart({ emotionsData }) {
  const emotions = ["happy", "angry", "sad", "surprised", "neutral"];
  const state = {
    series: [
      {
        data: [...Object.values(emotionsData)],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {},
        },
      },
      colors: ["#b32424", "#24b3a2", "#600c78", "#a315bf", "#5f5561"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: emotions,
        labels: {
          style: {
            colors: ["#b32424", "#24b3a2", "#600c78", "#5f5561"],
            fontSize: "12px",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100vw",
        position: "absolute",
        zIndex: 800,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width={500}
        height={320}
      />
    </div>
  );
}
