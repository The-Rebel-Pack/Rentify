const express = require('express');
// const morgan = require('morgan')
const cors = require('cors')
const middleware = require('./middleware');

const app = express();
const port = process.env.PORT || 5000;
const { resetDb } = require('./utils/db_create');
const { createHttpError } = require('./utils/validation');

// app.use(morgan('dev'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/db/reset', async (req, res, next) => {
  try {
    const rows = await resetDb(next);
    res
      .status(201)
      .json(rows)
  } catch (err) {
    return next(err);
  }
});


app.get('/api/protectedroute', middleware.decodeToken, (req, res) => {
  return res.json({ message: "this is a protected route, needs authorization token in header" });
});

app.use('/api/users', require('./routers/users'));

app.use('/api/listings', require('./routers/listings'));

app.use(function (req, res, next) {
  next(createHttpError(404, 'Route not found'));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err.message || 'Oops, something went wrong');
});

app.listen(port, () => console.log(`Api listening at http://localhost:${port}/`));
