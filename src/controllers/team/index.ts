import { Router } from 'express'
import { create, read, readByOwnerId } from './teamController'

const router = Router();
router.post('/', create);
router.get('/ownedTeams', readByOwnerId);
router.get('/:teamId', read);

export default router;