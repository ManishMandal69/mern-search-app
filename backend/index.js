const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Animal = require('./models/Animal');
const dotenv = require('dotenv')

const app = express();
const PORT = 5000;
dotenv.config()

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Endpoints

// Post new animal data
app.post('/api/animals', async (req, res) => {
  const { name, description, habitat } = req.body;

  if (!name || !description || !habitat) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAnimal = new Animal({ name, description, habitat });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for animals
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
  
    try {
      const animals = await Animal.find({
        name: new RegExp(query, 'i') // Case-insensitive regex search
      });
      res.json(animals);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.error('Error during search:', err);
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
