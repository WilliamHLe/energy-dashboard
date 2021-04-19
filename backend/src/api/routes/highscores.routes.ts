import express from 'express';

import highscoresController from '../controllers/highscores.controllers';

const router = express.Router();

router.get('/:slug', highscoresController.getHighscoresForCategory);

export default router;
