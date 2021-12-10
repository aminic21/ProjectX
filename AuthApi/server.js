require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;

// podatki uporabnika
const userData = {
  userId: "1",
  password: "123456A",
  name: "Aljosa",
  username: "aljo",
  isAdmin: true
};

app.use(cors());
app.use(bodyParser.json());





app.get('/api/v1/home', function (req, res) {
  
    return res.status(200).json({
      
      message: "deluje."
    });
  
})

// potrditev uporabnika
app.post('/api/v1/login', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  // vrne statuts 400(bad request), če username in password ne obstajata
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  // vrne 401(Unauthorized), če vrednosti username ali password nista pravilno zapisani
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }

  // generira token
  const token = utils.generateToken(userData);
  // pridobitev osnovnih podatkov o uporabniku
  const userObj = utils.getCleanUser(userData);
  // vrne token skupaj s podatki o uporabniku
  return res.json({ user: userObj, token });
});


// preveri žeton in ga vrne, če je veljaven
app.get('/api/v1/me', function (req, res) {
  // preveri glavo ali url parametre ali post parametre za token
  const token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // preveri žeton, ki je bil posredovan z dekodiranjem žetona, ki vsebuje skrivnost 
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // vrne status 401, če se uporabniški Id ne ujema.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // pridobitev osnovnih podatkov o uporabniku
    const userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
