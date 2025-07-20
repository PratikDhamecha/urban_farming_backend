const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user/user.routes');
const badgeRoutes = require('./routes/badge/badge.routes');
const diagnosisRoutes = require('./routes/diagnosis/diagnosis.routes');
const postsRoutes = require('./routes/post/post.routes');
const cors = require('cors');
const app = express();
const scheduleRoutes = require('./routes/schedule');


app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080', // Your frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded avatars

module.exports = app;