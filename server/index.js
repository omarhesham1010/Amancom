const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Example protected route
// const authMiddleware = require('./middlewares/auth');
// app.get('/api/protected', authMiddleware, (req, res) => {
//   res.json({ message: 'Protected data', user: req.user });
// });

app.get('/', (req, res) => {
  res.json({ message: 'Amancom API is running' });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 