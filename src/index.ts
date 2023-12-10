import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ENV } from './env';
import { LOGGER } from './logger';
import { userRouter } from './user/user.controller';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

const app = express();

if (ENV.NODE_ENV === 'production') {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.use('/api/v1', userRouter);

app.use(function onError(_: Request, res: Response & { sentry?: any }) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.listen(ENV.PORT, () => {
  LOGGER.info(`App Environment: ${ENV.NODE_ENV}`);
  LOGGER.info(`App running on port ${ENV.PORT}`);
});
