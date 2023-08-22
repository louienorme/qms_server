import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import dbConnect from './_config/dbConnect';
import speedLimiter from './_util/speedLimiter';
import rateLimiter from './_util/rateLimiter';

// Routes
import authRoutes from './auth/routers';
import accountRoutes from './accounts/routers';
import queueRoutes from './queue/routers';
import poolRoutes from './pool/routers';
import archiveRoutes from './archive/routers';

// Require Env
dotenv.config();

// Create Server
const app: Application = express();
const server = http.createServer(app);

// Limiters
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
}
// app.use(speedLimiter)
// app.use(rateLimiter)

// Enables to handle json requests
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// APIs
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/pools', poolRoutes);
app.use('/api/archives', archiveRoutes);

// Test apis for webhook
app.use('/webhook', (req, res: any, next) => {
  console.log({ 'This is test webhook endpoint': res.data });
});

// Run App
const port = process.env.PORT || 5000;

const runServer = async () => {
  console.clear();
  console.log(
    'This is the Queue Management System Backend Server by Enorme, John Loui and Ang, Eric Geo \n'
  );

  if (await dbConnect()) {
    server.listen(port, () => {
      console.log(
        `Now running and listening at \x1b[32m${
          process.env.NODE_ENV === 'development' ? 'localhost:' : 'SERVER-IP'
        }${port}`,
        '\x1b[0m'
      );
      console.log('Server logging starts now.');
    });
  }
};

runServer();
