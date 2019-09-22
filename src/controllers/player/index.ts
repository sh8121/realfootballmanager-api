import { Router } from 'express'
import { register, edit, deleteP, findByTeam, findMatchByPlayer } from './playerController'
import { authMiddleware } from '../../middlewares/auth';

const router = Router({mergeParams: true});
router.use('/', authMiddleware);
router.post('/', register);
router.put('/:playerId', edit);
router.delete('/:playerId', deleteP);
router.get('/', findByTeam);
router.get('/:playerId/matches', findMatchByPlayer);

export default router;