import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, GeneratedImage } from './models/db.js';
import mongoose from 'mongoose';



dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORG,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//Mongodb connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose connection success 
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected successfully');
});

// Mongoose connection error 
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

//Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user record
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '365d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user 
app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT token
    const userId = decodedToken.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return username
    res.json({ username: user.username });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const checkImageGenerationLimit = async (req, res, next) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  try {
    const existingImage = await GeneratedImage.findOne({ ipAddress });
    if (existingImage) {
      return res.status(403).json({ error: 'Image generation limit reached for this IP address' });
    }
    next(); 
  } catch (error) {
    console.error('Error checking image generation limit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Loci text generator
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

app.post("/generate-image", checkImageGenerationLimit,  async (req, res) => {
  try {
    const { completion } = req.body;

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const prompt = Array.isArray(completion) ? completion.join('\n') : completion;

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n:1
    });

    await GeneratedImage.create({ ipAddress });
    res.json({ image });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


