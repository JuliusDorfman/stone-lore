const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Body Parser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Initialize routes folder
const stoneRoutes = require('./api/routes');
app.use('/api/routes', stoneRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, '/client/build')));
	app.get('/*', (req, res) => {
    res.set('Content-Type', 'application/json');
		res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
	});
}

const port = process.env.PORT || 8080;
app.listen(port,
  () =>
  console.log(`Listening on port ${port}`)
);