import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function EmotionsChart_inline({ emotionsData }) {
  const optionsBar = {
    chart: {
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ["happy", "angry", "sad", "surprised", "neutral"],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.35,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [90, 0, 100],
      },
    },
  };

  const seriesBar = [
    {
      name: "happy",
      data: [emotionsData.happy],
    },
    {
      name: "angry",
      data: [emotionsData.angry],
    },
    {
      name: "sad",
      data: [emotionsData.sad],
    },
    {
      name: "surprised",
      data: [emotionsData.surprised],
    },
    {
      name: "neutral",
      data: [emotionsData.neutral],
    },
  ];

  // const updateCharts = ()=> {
  //   const max = 90;
  //   const min = 30;
  //   const newMixedSeries = [];
  //   const newBarSeries = [];
  //
  //   this.state.seriesMixedChart.forEach((s) => {
  //     const data = s.data.map(() => {
  //       return Math.floor(Math.random() * (max - min + 1)) + min;
  //     });
  //     newMixedSeries.push({ data: data, type: s.type });
  //   });
  //
  //   this.state.seriesBar.forEach((s) => {
  //     const data = s.data.map(() => {
  //       return Math.floor(Math.random() * (180 - min + 1)) + min;
  //     });
  //     newBarSeries.push({ data, name: s.name });
  //   });
  //
  //   this.setState({
  //     seriesMixedChart: newMixedSeries,
  //     seriesBar: newBarSeries,
  //     seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
  //   });
  // }

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
        options={optionsBar}
        height={140}
        series={seriesBar}
        type="bar"
        width={800}
      />
    </div>
  );
}
