const router = require('express').Router();

const Game = require('../models/game');

router.get('/all', async (req, res) => {
  try {
    const games = await Game.findAll({ where: { owner_id: req.user.id } });
    res.status(200).json({ games, message: 'Data fetched.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Data not found' });
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { id: owner_id } = req.user;

  try {
    const game = await Game.findOne({ where: { id, owner_id } });
    res.status(200).json({ game });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Data not found." });
  }
})

router.post('/create', async (req, res) => {
  const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
  const { id: owner_id } = req.user;

  try {
    const game = await Game.create({
      title,
      owner_id,
      studio,
      esrb_rating,
      user_rating,
      have_played,
    });
    res.status(200).json({ game, message: 'Game created.' });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.put('/update/:id', async (req, res) => {
  const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
  const { id: owner_id } = req.user;
  const { id } = req.params;

  try {
    const game = await Game.update(
     { title, studio, esrb_rating, user_rating, have_played },
    { where: { id, owner_id } },
    );
    res.status(200).json({ game, message: 'Successfully updated.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
})

router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params;
  const { id: owner_id } = req.user;

  try {
    const game = await Game.destroy({ where: { id, owner_id } });
    res.status(200).json({ game, message: 'Successfully deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
})

module.exports = router;
