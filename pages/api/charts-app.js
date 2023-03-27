// components/HighchartsPage.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const bloombergTheme = {
  // ... (theme options)
};

const seriesOptions = [
  { value: 'GNPCA', label: 'US Real Gross Domestic Product' },
  // Add more series options here
];

const HighchartsPage = () => {
  const [data, setData] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(seriesOptions[0].value);

  useEffect(() => {
    fetchData(selectedSeries);
  }, [selectedSeries]);

  const fetchData = async (seriesId) => {
    try {
      const response = await fetch(`/api/data?series_id=${seriesId}`);
      const json = await response.json();
      setData(json.observations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSeries = (event) => {
    setSelectedSeries(event.target.value);
  };

  const options = {
    title: {
      text: seriesOptions.find((option) => option.value === selectedSeries)?.label || '',
    },
    series: [
      {
        name: 'Series',
        data: data ? data.map(datum => [new Date(datum.date).getTime(), parseFloat(datum.value)]) : [],
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
    <div>
      <div>
        <label htmlFor="series-select">Select series:</label>
        <select id="series-select" value={selectedSeries} onChange={handleChangeSeries}>
          {seriesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartsPage;
