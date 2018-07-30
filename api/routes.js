const express = require('express');
const router = express.Router();
const axios = require('axios');

/*
 * @Route GET /api/routes/test
 * @Desc GET test
 * @Access Public
 */

router.get('/test', (req, res) => {
  res.json({
    routerGet: "we hit router.get in routes.js"
  })
  console.log("Test Route from routes.js")
})


/*
 * @Route GET /api/routes/murloc
 * @Desc GET murloc
 * @Access Public
 */

router.get('/murloc', (req, res) => {
  axios.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/Murloc', {
      headers: {
        "X-Mashape-Authorization": 'Das4135R2Smsh5AbDKdQdqYDjURDp1WKsN8jsnETmcfXMAhtjN'
      }
    })
    .then(result => {
      // console.log("Murloc Route from routes.js", result)
      return res.json({
        murlocGet: result.data
      })
    })
})

module.exports = router;