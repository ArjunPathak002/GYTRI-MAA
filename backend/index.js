const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Define your routes
app.use('/api', require('./routes/CreatUser')); 
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
