const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


const stoneRoutes = require('./api/routes');
app.use('/api/routes', stoneRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`));