// pages/api/gdp-data.js
import axios from 'axios';

const API_KEY = '3470b12101b9496a3ef4c864044a0692';
const FRED_API_URL = `https://api.stlouisfed.org/fred/series/observations?series_id=GNPCA&api_key=${API_KEY}&file_type=json`;

export default async function handler(req, res) {
  try {
    const response = await axios.get(FRED_API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch GDP data:', error);
    res.status(500).json({ error: 'Failed to fetch GDP data' });
  }
}
