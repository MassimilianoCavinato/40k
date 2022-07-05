const router =  require('express').Router()
const roasterController = require('../controllers/roaster')

router.get('/', (req, res) => res.send('In the future there\'s only war.'))
router.get('/roaster', (req, res) => roasterController.load(req,res))

module.exports = router
