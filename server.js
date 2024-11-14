const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 🥱, SHUTTING DOW...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const index = require('./index');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = index.listen(port, () => {
  console.log('App running on port 3000...');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 🥱, SHUTTING DOW...');
  server.close(() => {
    process.exit(1); // 0: stands for a success, 1: stands for uncaught exception
  });
});

/*
  - Architecture MVC: Controller layer and the funtion of the controllers is to handle the application request, 
  interact with models and send back responses to client
*/
