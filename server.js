import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();

// Enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
// Create a Apollo Server

// Listen to HTTP and WebSocket server
const PORT = process.env.PORT || process.env.API_PORT;
app.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}`);
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}`
  );
});
