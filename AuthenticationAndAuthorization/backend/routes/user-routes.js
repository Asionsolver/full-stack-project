
const { signup, login }  = require("../controllers/auth-controller");
const { getUser } = require('../controllers/user-controller');
const verifyToken = require('../middlewares/verifyToken');

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);

module.exports = router;

