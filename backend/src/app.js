const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const staffRoutes = require("./routes/staffRoutes");
app.use("/api/staff", staffRoutes);

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

module.exports = app;
