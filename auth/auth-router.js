const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('./auth_model');
const secrets = require('../config/secrets');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first() //without first() the user is returned but in an array
    .then(user => {
      console.log("user", user)
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); //<<<<<<<<<<<<<

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    // subject is normally the user's id (who/what the token describes)
    subject: user.id, // translates unto the "sub" property on the token
    username: user.username,
  };
  const options = {
    expiresIn: '8h',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
