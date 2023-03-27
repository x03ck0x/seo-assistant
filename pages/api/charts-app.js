// components/HighchartsPage.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const bloombergTheme = {
  colors: ['#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
  chart: {
    backgroundColor: '#343434',
    style: {
      fontFamily: 'Arial',
    },
  },
  title: {
    style: {
      color: '#fff',
    },
  },
  xAxis: {
    gridLineColor: '#555',
    labels: {
      style: {
        color: '#999',
      },
    },
    lineColor: '#555',
    minorGridLineColor: '#444',
    tickColor: '#555',
    title: {
      style: {
        color: '#ddd',
      },
    },
  },
  yAxis: {
    gridLineColor: '#555',
    labels: {
      style: {
        color: '#999',
      },
    },
    lineColor: '#555',
    minorGridLineColor: '#444',
    tickColor: '#555',
    tickWidth: 1,
    title: {
      style: {
        color: '#ddd',
      },
    },
  },
  legend: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    itemStyle: {
      color: '#fff',
    },
    itemHoverStyle: {
      color: '#aaa',
    },
    itemHiddenStyle: {
      color: '#444',
    },
    title: {
      style: {
        color: '#C0C0C0',
      },
    },
  },
};

Highcharts.setOptions(bloombergTheme);

const HighchartsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./api/data')
      .then(response => response.json())
      .then(json => setData(json.observations))
      .catch(error => console.error(error));
  }, []);

  const options = {
    title: {
      text: 'US Real Gross Domestic Product',
    },
    series: [
      {
        name: 'GDP',
        data: data.map(datum => [new Date(datum.date).getTime(), parseFloat(datum.value)]),
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
        text: 'Billions of Dollars',
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartsPage;
