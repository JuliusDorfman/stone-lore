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
    testRoute: "Route: /api/routes/test"
  })
  console.log("Route: /api/routes/test")
})

/*
 * @Route GET /api/routes/standardmeta
 * @Desc GET standardmeta
 * @Access Public
 */

router.get('/standardmeta', (req, res, err) => {
  axios.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards', {
    headers: {
      "X-Mashape-Authorization": "TK4lLfWSkumshWvrAW9tcCU3SXFbp1r75tHjsnYxPQ3wJgoz1p"
    }
  }).then(result => {
    res.json({
      standardMeta: result.data
    })
    console.log("Route: /api/routes/standardmeta");
  })
})


/*
 * @Route GET /api/routes/:races
 * @Desc GET race
 * @Access Public
 */

// router.get('/races/:race', (req, res) => {
//   axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/${req.params.race}`, {
//       headers: {
//         "X-Mashape-Authorization": 'Das4135R2Smsh5AbDKdQdqYDjURDp1WKsN8jsnETmcfXMAhtjN'
//       }
//     })
//     .then(result => {
//       return res.json({
//         raceGet: result.data
//       })
//     }).catch(err => {
//       console.log("Races Get Error: " + err)
//     })
// })



module.exports = router;