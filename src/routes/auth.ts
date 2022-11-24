import { Router } from 'express';
import { createUser } from '../controllers/users';
import { signin } from '../controllers/auth';

const router = Router();

router.post('/signin', signin);

router.post('/signup', createUser);

export default router;
