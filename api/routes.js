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
 * @Route GET /api/routes/:races
 * @Desc GET race
 * @Access Public
 */

router.get('/races/:race', (req, res) => {
  axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/${req.params.race}`, {
      headers: {
        "X-Mashape-Authorization": 'Das4135R2Smsh5AbDKdQdqYDjURDp1WKsN8jsnETmcfXMAhtjN'
      }
    })
    .then(result => {
      return res.json({
        raceGet: result.data
      })
    }).catch(err => {
      console.log("Races Get Error: " + err)
    })
})



module.exports = router;