import express, { json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './src/routes/userRouter';
import loginRouter from './src/routes/loginRouter';
config();

const port = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vietedu API',
      version: '1.0.0',
      description: 'A simple API',
    },
    servers: [
      {
        url: `https://vieteduapi.herokuapp.com/api`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/user', userRouter);
app.use('/api', loginRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
