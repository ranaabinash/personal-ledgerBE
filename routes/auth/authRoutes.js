const { Router } = require("express");
const { signup, login, user_get } = require("../../controller/auth/authController");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", user_get);

module.exports = router;
