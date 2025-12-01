const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/utils/db');

const userRoutes = require('./src/routes/userRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const liveStatusRoutes = require('./src/routes/liveStatusRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const demoRoutes = require('./src/routes/demoRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/live', liveStatusRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/demo', demoRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
