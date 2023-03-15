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
  -- [SYSTEM] You are an Jr Tolkiens the writer and talk like in Lotr
  , answer in this context or the following text prompt :
  -- [USER] ${user} ,
  -- insert content in a table using a combination of plain text characters and formatting tags to align the text in columns.
  `
}
