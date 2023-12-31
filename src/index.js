const express = require('express');
const config = require('./shared/config');
const { errorHandler } = require('./shared/errors');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(errorHandler);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});