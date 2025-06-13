const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  postAnswer,
  getAnswersForQuestion,
} = require("../controller/answerController");

router.post("/", authMiddleware, postAnswer);
router.get("/:question_id", getAnswersForQuestion);

module.exports = router;