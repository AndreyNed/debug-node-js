const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    const { full_name, username, password, email } = req.body.user;
    const user = await User.create({
      full_name,
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      email,
    });
    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
    res.status(200).json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message)
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body.user;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw Object.create({ status: 404, error: 'User not found' });
    }
    const matches = bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw Object.create({ status: 502, error: 'Password do not match' });
    }
    const sessionToken = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
    res.status(200).json({
      user,
      message: "Successfully authenticated.",
      sessionToken,
    });
  } catch (e) {
    console.error(e);
    const {
      status = 500,
      error,
      message = 'Server error',
    } = e || {};
    res.status(status).json({ error: error || message });
  }
})

module.exports = router;
