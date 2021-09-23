import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import authRoutes from  './auth/routers';

// Require Database Config and Env
require('dotenv').config();
require('./_config/dbConfig')();

// Create Server
const app: Application = express();
const server = http.createServer(app);

// Enables to handle json requests
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// APIs
app.use('/api/auth', authRoutes);

// Run App
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Queue Management Server started on Port ' + port);
    console.log('Server Logging starts now..');
});