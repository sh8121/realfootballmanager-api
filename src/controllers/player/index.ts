import { Router } from 'express'
import { register, findByTeam } from './playerController'
import { authMiddleware } from '../../middlewares/auth';

const router = Router({mergeParams: true});
router.use('/', authMiddleware);
router.post('/', register);
router.get('/', findByTeam);

export default router;