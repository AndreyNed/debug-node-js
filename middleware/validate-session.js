const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateSession = async (req, res, next) => {
  if (req.method.toUpperCase() === 'OPTIONS') {
    next();   // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    } else {
      try {
        const decoded = jwt.verify(sessionToken, 'lets_play_sum_games_man') || {};
        const user = await User.findOne({ where: { id: decoded.id } });
        req.user = user;
        console.log(`user: ${user}`)
        next();
      } catch (e) {
        console.error(e);
        res.status(401).send({ error: "not authorized" });
      }
    }
  }
};

module.exports = validateSession;
