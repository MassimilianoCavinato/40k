const router =  require('express').Router()
const rosterController = require('../controllers/roster')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/', (req, res) => res.send('In the future there\'s only war.'))
router.get('/rosters', rosterController.load)
router.post('/rosters', upload.single("roster"), rosterController.upload)

module.exports = router
