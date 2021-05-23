const jwt = require('jsonwebtoken');

const User = require('../models/user');
const log = require('../utils/log');

const validateSession = async (req, res, next) => {
  if (req.method.toUpperCase() === 'OPTIONS') return next();

  const sessionToken = req.headers.authorization;
  log.info(sessionToken);

  if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." });

  try {
    const decoded = jwt.verify(sessionToken, 'lets_play_sum_games_man') || {};
    const user = await User.findOne({ where: { id: decoded.id } });
    req.user = user;
    log.info(`user: ${user.username}`);
    next();
  } catch (e) {
    log.error(e);
    res.status(401).send({ error: "not authorized" });
  }
};

module.exports = validateSession;
