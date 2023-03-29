import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const MyChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current.chart;

    chart.addSeries({
      name: 'Series',
      data: [1, 2, 3],
    });
  }, []);

  const options = {
    title: {
      text: 'My Chart',
    },
    series: [],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default MyChart;
