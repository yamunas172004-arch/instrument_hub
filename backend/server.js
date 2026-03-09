require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const User = require('./models/User');
app.get('/api/debug-users', async (req, res) => {
  try {
    const users = await User.find({}, 'email name role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
