import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/rental/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/rental/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/rental/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };
