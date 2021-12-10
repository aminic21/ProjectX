// ustvarni token z uporabo skrivnosti .env.JWT_SECRET
const jwt = require('jsonwebtoken');

// ustvari token in ga vrne
function generateToken(user) {
 
  if (!user) return null;

  const u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // poteče čez 24ur (60s=1m 1m*60m=1h 1H*24h =24h)
  });
}

// vrnw osnovne podatke uporabnika
function getCleanUser(user) {
  if (!user) return null;

  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}

module.exports = {
  generateToken,
  getCleanUser
}
