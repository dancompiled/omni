import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ENV } from './env';
import { LOGGER } from './logger';
import { userRouter } from './user/user.controller';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.use('/api/v1', userRouter);

app.listen(ENV.PORT, () => {
  LOGGER.info(`App Environment: ${ENV.NODE_ENV}`);
  LOGGER.info(`App running on port ${ENV.PORT}`);
});
