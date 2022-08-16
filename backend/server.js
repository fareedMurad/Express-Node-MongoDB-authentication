const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5050;
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

connectDB();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.use('/api/users', require('./routes/userRoutes'));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.use(errorHandler);

    server.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

