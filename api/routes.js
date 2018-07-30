const express = require('express');
const router = express.Router();

/*
* @Route GET /api/route/test
* @Desc GET test
* @Access Public
*/

router.get('/test', (req, res) => {
  res.json({routerGet: "we hit router.get in routes.js"})
  console.log("Test Route from routes.js")
})

module.exports = router;