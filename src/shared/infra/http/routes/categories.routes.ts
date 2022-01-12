import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/category/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/category/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/category/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
