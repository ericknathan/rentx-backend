import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { rentalRoutes } from './rentals.routes';
import { authenticationRoutes } from './authentication.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
router.use(authenticationRoutes);

export { router };
