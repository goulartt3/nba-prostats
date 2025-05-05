import { Router } from 'express';
import { getGames, getStandings } from '../controllers/nbaController.js';

const router = Router();

router.get('/games', getGames);
router.get('/standings', getStandings);

export default router;