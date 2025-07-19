const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user/user.routes');
const badgeRoutes = require('./routes/badge/badge.routes');
const diagnosisRoutes = require('./routes/diagnosis/diagnosis.routes');
const postsRoutes = require('./routes/post/post.routes');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/posts', postsRoutes);

module.exports = app;