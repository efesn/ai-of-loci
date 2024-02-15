import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORG,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/generate-loci", async (req, res) => {
  console.log("Received a request:", req.body);
  const { message, place } = req.body;

  const conversationHistory = [
    { "role": "system", "content": "I want you to act as a method of loci generator. You help people to memorize things using the method of loci. User will provide the thing he/she wants to memorize. Once you have this information, start generation. Use your most efficient way to generate this. Don't keep it too short or too long. You decide the place etc. Don't add extra comments. Answer in numbered list. Go to the next line below at the end of each sentence. Here is your task:" },
    { "role": "user", "content": `${message} (Place: ${place})` }
  ];

  try {
    const handleGenerateCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      max_tokens: 1000,
    });

    res.json({ completion: handleGenerateCompletion.choices[0].message });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/generate-image", async (req, res) => {
  try {
    const { completion } = req.body;

    
    const prompt = Array.isArray(completion) ? completion.join('\n') : completion;

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n:1
    });

    res.json({ image });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});