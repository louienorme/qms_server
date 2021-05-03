const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Bodyparser Middleware

app.user(express.json());

const db = process.env.dbURI;

// Connect to Mongo

mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('Database Connected'))
	.catch(err => console.log(err));

// Routes
// app.use('/api/auth', require('./routes/api/auth/user'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));