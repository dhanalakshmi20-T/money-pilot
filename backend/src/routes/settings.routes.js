const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { getSettings, updatePreferences, changePassword, deleteAccount } = require('../controllers/settings.controller');

router.get('/', auth, getSettings);
router.put('/preferences', auth, updatePreferences);
router.put('/password', auth, changePassword);
router.delete('/account', auth, deleteAccount);

module.exports = router;