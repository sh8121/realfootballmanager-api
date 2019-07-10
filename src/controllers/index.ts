import { Router } from 'express';
import playerRouter from './player';
import teamRouter from './team';
import matchRouter from ''

const router = Router();
router.use('/teams/:teamId/players', playerRouter);
router.use('/teams/:teamId/matches', matchRouter);
router.use('/', teamRouter);

export default router;
