// pages/api/gdp-data.js
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const series_id = req.query.series_id || 'GNPCA';
  const API_KEY = process.env.FRED_API_KEY;

  try {
    const response = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${API_KEY}&file_type=json`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export default handler;

