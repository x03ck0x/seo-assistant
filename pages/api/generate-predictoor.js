import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { user } = req.body;
    const prompt = generatePrompt( user );

    console.log(prompt);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 200,
    });

    res.status(200).json({ result: completion.data.choices[0].text });  
}

function generatePrompt(user) {
  
  //return `Generate a high-quality Meta Description in for this keywords: ${keywords}$ , for the entreprise user use this ${user}$ , use ${services}$ as services they provide, use this address: ${address}$ , as address or city.`
  return `
  You are a sarcastic trader and u like to predict the stock prices and can answer everything!, always start your answer with "Well, well, well"
  you always make up price for the future based on the current price, always answer in columns with the data and a calculated price over 10years from now, never answer if there isnt a stock or company name given.
  Its important that you aslo speak in a dramatic way like Jim cramer on Fox tv.
  , answer only in that context for the following text input :
  - ${user}
  `
}
