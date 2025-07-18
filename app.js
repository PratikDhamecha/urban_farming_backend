const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user/user.routes');
const badgeRoutes = require('./routes/badge/badge.routes');
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/badges', badgeRoutes);

module.exports = app;