import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './src/routes/userRouter';
import loginRouter from './src/routes/loginRouter';
config();

const port = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to vietedu!' });
});
app.use('/api/user', userRouter);
app.use('/api', loginRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
