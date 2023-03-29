import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import VBP from 'highcharts/indicators/volume-by-price';

if (typeof Highcharts === 'object') {
    VBP(Highcharts);
  }

const HighchartsStock = () => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
      const data = await response.json();
      const ohlc = [];
      const volume = [];
      const dataLength = data.length;
      const groupingUnits = [
        [
          'week',
          [1]
        ], [
          'month',
          [1, 2, 3, 4, 6]
        ]
      ];

      for (let i = 0; i < dataLength; i += 1) {
        ohlc.push([
          new Date(data[i][0]).getTime(),
          data[i][1],
          data[i][2],
          data[i][3],
          data[i][4]
        ]);

        volume.push([
          new Date(data[i][0]).getTime(),
          data[i][5]
        ]);
      }

      setOptions({
        rangeSelector: {
          selected: 2
        },

        title: {
          text: 'AAPL Historical'
        },

        subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
        },

        yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],

        tooltip: {
          split: true
        },

        plotOptions: {
          series: {
            dataGrouping: {
              units: groupingUnits
            }
          }
        },

        series: [{
          type: 'candlestick',
          name: 'AAPL',
          id: 'aapl',
          zIndex: 2,
          data: ohlc
        }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: volume,
          yAxis: 1
        }, {
          type: 'vbp',
          linkedTo: 'aapl',
          params: {
            volumeSeriesID: 'volume'
          },
          dataLabels: {
            enabled: false
          },
          zoneLines: {
            enabled: false
          }
        }, {
          type: 'sma',
          linkedTo: 'aapl',
          zIndex: 1,
          marker: {
            enabled: false
          }
        }]
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartsStock;
