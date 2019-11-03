import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true
  })
);

app.get('/test', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

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

// Listen to HTTP and WebSocket server
const PORT = process.env.PORT || process.env.API_PORT;
app.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}`);
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}`
  );
});
