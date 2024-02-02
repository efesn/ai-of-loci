import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  console.log("Received a request:", req.body);
  const { message } = req.body;

  const conversationHistory = [
    { "role": "system", "content": "I want you to act as a method of loci generator. You help people to memorize things using the method of loci. User will provide the thing he/she wants to memorize. Once you have this information, start generation. Use your most efficient way to generate this. Don't keep it too short or too long. You decide the place etc. Don't add extra comments. Answer in numbered list. Go to the next line below at the end of each sentence. Here is your task:" },
    { "role": "user", "content": message },
  ];

  try {
    const handleGenerateCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      max_tokens: 500,
    });

    res.json({ completion: handleGenerateCompletion.choices[0].message });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
