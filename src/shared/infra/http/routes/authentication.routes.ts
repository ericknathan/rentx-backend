import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/user/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/user/refreshToken/RefreshTokenController';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticationRoutes.post('/sessions', authenticateUserController.handle);
authenticationRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticationRoutes };
