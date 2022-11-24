import { Router } from 'express';

import {
  editAvatar, editUser, getAllUsers, getUserById,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', editAvatar);

router.patch('/me', editUser);

router.get('/:userId', getUserById);

router.get('/', getAllUsers);

export default router;
