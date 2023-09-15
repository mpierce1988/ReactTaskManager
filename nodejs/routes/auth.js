const router = require('express').Router();

let users = [
    {
        id: 1, 
        name: "Michael", 
        email: "mpierce1138@gmail.com", 
        password: "Password123!"
    },
];

// Register a new user
router.post('/register', (req, res) => {

    // validate name, email and password were provided
    if (!req.body.name) return res.status(400).send('Name is required');
    if (!req.body.email) return res.status(400).send('Email is required');
    if (!req.body.password) return res.status(400).send('Password is required');

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    users.push(user);
    res.status(200).send({status: "Success"});
});

// Login a user
router.post('/login', (req, res) => {
    // validate email and password were provided
    if (!req.body.email) return res.status(400).send('Email is required');
    if (!req.body.password) return res.status(400).send('Password is required');

    const user = users.find(user => user.email === req.body.email);
    if(!user) return res.status(400).send('Email not found');

    const validPassword = user.password === req.body.password;
    if (!validPassword) return res.status(400).send('Invalid password');

    res.status(200).send({status: "Success", user: user});
});

module.exports = router;