const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getme);

// เพิ่ม endpoint เพื่อให้ไคลเอนต์สามารถเรียกดูค่าทั้งหมดของ enum Role
// router.get('/roles', (req, res) => {
//   res.json({ roles: Object.values(Role) });
// });
module.exports = router