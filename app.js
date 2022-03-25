const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to vietedu!' });
});
require('./src/routes/userRouter.js')(app);
require('./src/routes/loginRouter.js')(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
