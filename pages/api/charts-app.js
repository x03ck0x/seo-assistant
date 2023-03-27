// components/HighchartsPage.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const bloombergTheme = {
  // ... (theme options)
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

const seriesOptions = [
  { value: 'GNPCA', label: 'US Real Gross Domestic Product' },
  { value: 'UNRATE', label: 'Unemployment Rate' },
  { value: 'DFF', label: 'Federal Funds Effective Rate' },
  { value: 'PAYEMS', label: 'All Employees, Total Nonfarm' },
  { value: 'CORESTICKM159SFRBATL', label: 'Sticky Price Consumer Price Index' },
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
    tooltip: {
        formatter: function () {
          return `<b>${this.series.name}</b><br/>${Highcharts.dateFormat('%Y', this.x)}: ${this.y}`;
        },
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                alert(`Category: ${Highcharts.dateFormat('%Y', this.x)}\nValue: ${this.y}`);
              },
            },
          },
          marker: {
            lineWidth: 1,
          },
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
