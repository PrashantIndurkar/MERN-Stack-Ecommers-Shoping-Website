const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// uncaught error
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught error`);
	process.exit(1);
});

// config dotenv
dotenv.config({ path: 'backend/config/config.env' });

// connecting to data base
connectDatabase();

// app listen
const server = app.listen(process.env.PORT, () => {
	console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (err) => {
	console.log(`Error:${err.message}`);
	console.log(`Shutting down the server due to unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
