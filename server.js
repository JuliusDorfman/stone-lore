const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const bodyParser = require('body-parser');

// Body Parser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const stoneRoutes = require('./api/routes');
app.use('/api/routes', stoneRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port,
  () =>
  console.log(`Listening on port ${port}`)
);