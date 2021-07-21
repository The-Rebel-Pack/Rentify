const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const {
  createError,
  resetDb,
} = require('./utils/db');

app.get('/db/reset', (req, res) => {
  resetDb((err, row) => {
    if (err) {
      next(err);
    }
    res
      .status(201)
      .json(row)
  });
});

app.use('/api/users', require('./routers/users'));
app.use('/api/listings', require('./routers/listings'));

app.use(function (req, res, next) {
  next(createError(404, 'Route not found'));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err.message || 'Oops, something went wrong');
});

app.listen(port, () => console.log(`Api listening at http://localhost:${port}/`));
