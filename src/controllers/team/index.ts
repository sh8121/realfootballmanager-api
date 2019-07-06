import { Router } from 'express'
import { register, login, registerPlayer, findPlayers } from './teamController'
import { teamAuth } from '../../middlewares/auth';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.use('/:teamId/players', teamAuth);
router.post('/:teamId/players', registerPlayer);
router.get('/:teamId/players', findPlayers);

export default router;