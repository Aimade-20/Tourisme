const express = require("express");
const router = express.Router();
const { registerUser,loginUser } = require("../controllers/authController");
const {activitysControlle} = require("../controllers/activityController")

const validate = require("../middlewares/authMiddleware");

const {registerValidation,loginValidation} = require("../validation/authValidation")
 const {createActivityValidation} = require("../validation/activityValidation")

router.post("/register", registerValidation, registerUser);
router.post("/login" , loginValidation,loginUser)


router.post("/activitys" ,validate,createActivityValidation , activitysControlle)
module.exports = router;