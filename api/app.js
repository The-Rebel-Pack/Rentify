const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const { resetDb } = require('./utils/db_create');
const { createHttpError } = require('./utils/validation');
const logger = require('./middleware/logger');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/db/reset', async (req, res, next) => {
  try {
    const rows = await resetDb(next);
    res.status(201).json(rows);
  } catch (err) {
    return next(err);
  }
});

app.use('/api/users', require('./routers/users'));

app.use('/api/listings', require('./routers/listings'));

app.use((req, res, next) => {
  next(createHttpError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message || 'Oops, something went wrong');
});

app.listen(port, () =>
  console.log(`Api listening at http://localhost:${port}/`)
);
