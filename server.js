const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');



app.listen(port, () => console.log(`Listening on port ${port}`));