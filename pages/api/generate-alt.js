import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const {text, language} = req.body;
    const prompt = generatePrompt(text, language);

    console.log(prompt);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 400,
    });

    res.status(200).json({ result: completion.data.choices[0].text });  
}

function generatePrompt(text, language) {
  
  //return `Generate a high-quality Meta Description in for this keywords: ${keywords}$ , for the entreprise name use this ${name}$ , use ${services}$ as services they provide, use this address: ${address}$ , as address or city.`
  return `
  You are an expert in SEO speaking fluent ${language}$. For the following text prompt, 
  please write an alternative article almost identical to the text ,
  -- [PROMPT] ${text}
  `
}
