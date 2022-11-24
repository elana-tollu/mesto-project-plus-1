import { Router } from 'express';
import { authenticate } from '../middlewares/auth';

import {
  editAvatar, editUser, getAllUsers, getMe, getUser,
} from '../controllers/users';

const router = Router();

router.use(authenticate);

router.patch('/me/avatar', editAvatar);

router.patch('/me', editUser);

router.get('/me', getMe);

router.get('/:userId', getUser);

router.get('/', getAllUsers);

export default router;
