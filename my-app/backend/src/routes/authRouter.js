const express = require("express");
const router = express.Router();

const { registerUser,loginUser } = require("../controllers/authController");
const {activitysControlle} = require("../controllers/activityController")

const {authMiddleware} = require("../middlewares/authMiddleware");
const {guideMiddleware} = require("../middlewares/guideMiddleware")

const {registerValidation,loginValidation} = require("../validation/authValidation")
 const {activityValidation} = require("../validation/activityValidation")

router.post("/register", registerValidation, registerUser);
router.post("/login" , loginValidation,loginUser)


router.post("/activitys" , authMiddleware , guideMiddleware , activityValidation , activitysControlle)
module.exports = router;