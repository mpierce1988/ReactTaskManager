const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// import routes
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/tasks', taskRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})