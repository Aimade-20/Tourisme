const express = require("express")
const router = express.Router


const createCatogory = require ("../controllers/categoryController")

const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.post("")