import { Router } from 'express';
import member from './member';

const router = Router();
router.use('/member', member);

export default router;
