import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';
import upload from '@config/upload';

import '@shared/container';

import { router } from '@shared/infra/http/routes';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';

createConnection('localhost');
const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

var options = {
  customCssUrl: '/docs/public/styles.css',
  customSiteTitle: "Rentx Documentation",
  customfavIcon: "/docs/public/favicon.ico"
};

app.use('/docs/public', express.static(__dirname + '/public'));
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
