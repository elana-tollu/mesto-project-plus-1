import { Router } from 'express';
import { authenticate } from '../middlewares/auth';

import {
  editAvatar, editUser, getAllUsers, getUserById,
} from '../controllers/users';

const router = Router();

router.use(authenticate);

router.patch('/me/avatar', editAvatar);

router.patch('/me', editUser);

router.get('/:userId', getUserById);

router.get('/', getAllUsers);

export default router;
