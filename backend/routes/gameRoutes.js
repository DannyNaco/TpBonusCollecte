const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Routes Bonus (Doit être avant /:id)
router.get('/stats', gameController.getStats);

// Routes CRUD
router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;
