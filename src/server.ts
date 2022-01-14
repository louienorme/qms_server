import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import dbConnect from './_config/dbConnect';

// Routes
import authRoutes from  './auth/routers';
import accountRoutes from './accounts/routers';
import queueRoutes from './queue/routers';
import poolRoutes from './pool/routers';

// Require Env
dotenv.config()

// Create Server
const app : Application = express();
const server = http.createServer(app);

// Enables to handle json requests
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// APIs
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/pools', poolRoutes);

// Run App
const port = process.env.PORT || 5000;

const runServer = async () => {
    console.clear();
    console.log(
        "This is the Queue Management System Backend Server by Enorme, John Loui \n"
    );

    if (await dbConnect()) {
        server.listen(port, () => {
			console.log(
				`Now running and listening at \x1b[32m${
					process.env.NODE_ENV === "development"
						? "localhost:"
						: "SERVER-IP"
				}${port}`,
				"\x1b[0m"
			);
			console.log("Server logging starts now.");
		});
    }
}

runServer();