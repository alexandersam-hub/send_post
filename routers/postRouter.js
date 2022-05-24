const {Router} = require('express')
const postController = require('../controllers/postController')
const router = new Router()

router.post('/post_to_info', postController.sendPostToInfo)

module.exports = router