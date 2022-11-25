import { Router } from 'express';

import {
  editAvatar, editUser, getAllUsers, getMe, getUser,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', editAvatar);

router.patch('/me', editUser);

router.get('/me', getMe);

router.get('/:userId', getUser);

router.get('/', getAllUsers);

export default router;
