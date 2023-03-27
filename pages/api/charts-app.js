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
  { value: 'DCOILWTICO', label: 'Crude oil West Texas Intermediate data' },
  { value: 'DCOILBRENTEU', label: 'Crude oil Brent Europe data' },
  { value: 'DHHNGSP', label: 'Henry Hub Natural Gas Spot Price data' },
  { value: 'GASDESW', label: 'US Diesel Sales Price data' },
  { value: 'GASREGCOVW', label: 'US Regular Conventional Gas Price data' },
  { value: 'DGS20', label: '20 Year Treasury constant maturity rate data' },
  { value: 'DGS10', label: '10 Year Treasury constant maturity rate data' },
  { value: 'DGS5', label: '5 Year Treasury constant maturity rate data' },
  { value: 'DGS1', label: '1 Year Treasury constant maturity rate data' },
  { value: 'DGS3MO', label: '3 Month Treasury constant maturity rate data' },
  { value: 'MORTGAGE30US', label: '30 year Mortgage US data' },
  { value: 'MORTGAGE15US', label: '15 year Mortgage US data' },
  { value: 'MORTGAGE5US', label: '5 year Mortgage US data' },
  { value: 'TOTALSA', label: 'vehicle sales data' },
  { value: 'HOUST', label: 'total us private housing starts data' },
  { value: 'INDPRO', label: 'industrial production index data' },
  
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
      <div className="link-list">
        <a
          href="https://unusualwhales.com/alt-data#highcharts-ra9grv6-0"
          target="_blank"
          rel="noopener noreferrer"
        > </a>
      </div>
      <style jsx>{`
        .link-list {
          background-color: #212129;
          padding: 5px;
          width: auto;
          display: flex;
          flex-direction: column;
        }
        .link-list a {
          color: red;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .link-list a:hover {
          text-decoration: underline;
        }
        .link-list .material-icons {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default HighchartsPage;
