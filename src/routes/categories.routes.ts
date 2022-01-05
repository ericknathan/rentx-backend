import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/category/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/category/listCategories';
import { importCategoryController } from '../modules/cars/useCases/category/importCategory';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
