import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighchartsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&api_key=YOUR_API_KEY&file_type=json')
      .then(response => response.json())
      .then(json => setData(json.observations))
      .catch(error => console.error(error));
  }, []);

  const options = {
    title: {
      text: 'US Real Gross Domestic Product'
    },
    series: [{
      name: 'GDP',
      data: data.map(datum => [new Date(datum.date).getTime(), parseFloat(datum.value)])
    }],
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Year'
      }
    },
    yAxis: {
      title: {
        text: 'Billions of Dollars'
      }
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartsPage;
