import { Router } from 'express';

import {
  createUser, editAvatar, editUser, getAllUsers, getUserById,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', editAvatar);

router.patch('/me', editUser);

router.get('/:userId', getUserById);

router.get('/', getAllUsers);

router.post('/', createUser);

export default router;
