const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 5000
const middleware = require('./middleware');
const cors = require('cors')

var usersRouter = require('./routes/users');
const dotenv = require('dotenv')
dotenv.config();

const app = express()

app.use(cors())

app.use(middleware.decodeToken);

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/listings', (req, res) => {
  // Can store req.user in database for example
  console.log(req.user);
  return res.json({
      listings: [
          {
              title: "Skateboard"
          },
          {
              title: "Cat"
          },
          {
              title: "Bicycle"
          }
      ]
  });
});

app.use('/users', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
