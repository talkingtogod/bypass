const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
const mongoURI = "mongodb+srv://midlegg:ou4CmbyA5G1Pimvv@cluster0.y3h1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple User schema (username, password)
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// POST route for login (authentication)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If login is successful, return a success message
    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
