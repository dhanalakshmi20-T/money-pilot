const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { getProfile, updateProfile } = require("../controllers/profile.controller");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);

module.exports = router;