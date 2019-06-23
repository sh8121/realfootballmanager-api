import { Router } from 'express';
import player from './player';
import team from './team';

const router = Router();
router.use('/player', player);
router.use('/team', team);

export default router;
