import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';

import '@shared/container';

import { router } from '@shared/infra/http/routes';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';

createConnection('localhost');
const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));

var options = {
  customCssUrl: '/styles.css',
  customSiteTitle: "Rentx Documentation",
  customfavIcon: "/favicon.ico"
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
