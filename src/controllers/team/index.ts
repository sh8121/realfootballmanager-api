import { Router } from 'express'
import { register, login } from './teamController'

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.use('/:teamId/players', )

export default router;