const express = require("express");
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.post("/", registerUser);
router.get("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(authMiddleware, getUserProfile).put(authMiddleware, updateUserProfile);



module.exports = router;
