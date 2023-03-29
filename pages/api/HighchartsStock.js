import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const names = ['MSFT', 'AAPL', 'GOOG'];
const urls = [
  'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/msft-c.json',
  'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/aapl-c.json',
  'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/goog-c.json'
];

const Chart = () => {
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [seriesCounter, setSeriesCounter] = useState(0);

  useEffect(() => {
    const fetchData = async (url, name) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const data = json.map((datum) => [new Date(datum.date).getTime(), parseFloat(datum.close)]);
        setSeriesOptions((prevSeriesOptions) => [...prevSeriesOptions, { name, data }]);
        setSeriesCounter((prevSeriesCounter) => prevSeriesCounter + 1);
      } catch (error) {
        console.error(error);
      }
    };

    urls.forEach((url, index) => fetchData(url, names[index]));
  }, []);

  const createChart = () => {
    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 4,
      },
      plotOptions: {
        series: {
          showInNavigator: true,
        },
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} USD</b><br/>',
        valueDecimals: 2,
      },
      series: seriesOptions,
    });
  };

  useEffect(() => {
    if (seriesCounter === names.length) {
      createChart();
    }
  }, [seriesCounter]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={{}} />
    </div>
  );
};

export default Chart;
