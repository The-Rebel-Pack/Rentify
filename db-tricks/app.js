const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const {
  resetDb
} = require('./db');

app.get('/db/reset', (req, res) => {
  resetDb();
  res
    .status(201)
    .end('Database reset');
});

app.use('/api/users', require('./routers/users'));
app.use('/api/listings', require('./routers/listings'));

app.listen(port, () => console.log(`Api listening at http://localhost:${port}/`));
