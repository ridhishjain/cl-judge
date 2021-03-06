const express = require('express')
const { getEditorReaderQuestions } = require('../../models/questions')
const { verifyUserAccessToken } = require('../middlewares')
const router = express.Router()

router.get('/editor_questions', verifyUserAccessToken, (req, res) => {
  getEditorReaderQuestions({
    ...req.query,
    writeAccess: true,
    username: req.username,
  })
    .then((results) => {
      return res.status(200).json({
        success: true,
        results,
        error: null,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        results: null,
        error,
      })
    })
})

module.exports = router
