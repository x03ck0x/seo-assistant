// components/HighchartsPage.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// ... (bloombergTheme, seriesOptions, etc.)

const HighchartsPage = () => {
  // ... (state variables, useEffect, fetchData, handleChangeSeries)

  const options = {
    title: {
      text: seriesOptions.find((option) => option.value === selectedSeries)?.label || '',
    },
    series: [
      {
        name: 'Series',
        data: data && data.map(datum => [new Date(datum.date).getTime(), parseFloat(datum.value)]),
      },
    ],
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    ...bloombergTheme,
  };

  return (
    // ... (JSX)
  );
};

export default HighchartsPage;

