import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const {name, services, address, language } = req.body;
    const prompt = generatePrompt( name, services, address, language);

    console.log(prompt);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 200,
    });

    res.status(200).json({ result: completion.data.choices[0].text });  
}

function generatePrompt(name, services, address, language) {
  
  //return `Generate a high-quality Meta Description in for this keywords: ${keywords}$ , for the entreprise name use this ${name}$ , use ${services}$ as services they provide, use this address: ${address}$ , as address or city.`
  return `
  You are an expert in SEO speaking fluent ${language}$. For the following keywords or text prompt 
  -- [PROMPT] ${name} ,
  please write an optimized meta-title, the title should be 50-70 characters long, 
  a short meta-description that is compelling and makes people want to click, 
  the description should be a maximum of 160 characters long. Everything must be in language ${language}.
  Separate Title and Description by line break.
  `
}
