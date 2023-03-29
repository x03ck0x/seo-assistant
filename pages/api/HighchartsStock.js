import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';

import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    backgroundColor: 'black',
  },
  rangeSelector: {
    selected: 1,
  },
  title: {
    text: 'AAPL Stock Price',
    style: {
      color: '#fff',
    },
  },
  navigator: {
    series: {
      type: 'area',
      color: '#808080',
      fillOpacity: 0.05,
      lineWidth: 1,
      lineColor: '#808080',
      marker: {
        enabled: false,
      },
    },
  },
  series: [
    {
      name: 'AAPL',
      data: [],
      tooltip: {
        valueDecimals: 2,
      },
      color: '#fff',
    },
  ],
};

const HighchartsPage = () => {
  useEffect(() => {
    fetch('https://demo-live-data.highcharts.com/aapl-c.json')
      .then((res) => res.json())
      .then((data) => {
        options.series[0].data = data;
      });
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={options}
    />
  );
};

export default HighchartsPage;
