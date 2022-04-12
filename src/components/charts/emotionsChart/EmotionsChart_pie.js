import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function EmotionsChart_inline({ emotionsData }) {
  const translate = {
    happy: "שמחה",
    angry: "כעס",
    sad: "עצב",
    surprised: "הפתעה",
    neutral: "טבעי",
  };
  const options = {
    chart: {
      width: "100%",
      type: "pie",
    },
    labels: [
      translate.happy,
      translate.angry,
      translate.sad,
      translate.surprised,
      translate.neutral,
    ],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: "Monochrome Pie",
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    emotionsData.happy,
    emotionsData.angry,
    emotionsData.sad,
    emotionsData.surprised,
    emotionsData.neutral,
  ];

  return (
    <div
      style={{
        width: "100vw",
        position: "absolute",
        zIndex: 800,
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Chart
        options={options}
        height={400}
        series={series}
        type="pie"
        width={400}
      />
    </div>
  );
}
