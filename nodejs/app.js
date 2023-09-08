const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// import routes
const authRoute = require('./routes/auth');

// Route middlewares
app.use('/api/user', authRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})