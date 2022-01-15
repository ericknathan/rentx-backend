import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/auth/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetUserPasswordController } from '@modules/accounts/useCases/auth/resetUserPassword/ResetUserPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);

export { passwordRoutes };