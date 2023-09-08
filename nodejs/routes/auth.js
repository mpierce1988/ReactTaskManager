const router = require('express').Router();

let users = [];

// Register a new user
router.post('/register', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    users.push(user);
    res.send('User registered');
});

// Login a user
router.post('/login', (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if(!user) return res.status(400).send('Email not found');

    const validPassword = user.password === req.body.password;
    if (!validPassword) return res.status(400).send('Invalid password');

    res.send('Logged in');
});

module.exports = router;