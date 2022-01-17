import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/user/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/user/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '@modules/accounts/useCases/user/userProfile/UserProfileController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);
usersRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

export { usersRoutes };
