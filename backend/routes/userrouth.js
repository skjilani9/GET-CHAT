const express = require("express")
const router = express.Router();
const {register, loginuser, setavatar, getalluser, addmessage, getmessage, logout, getfriend} = require('../controls/userctr')

router.route('/register').post(register)
router.route('/login').post(loginuser)
router.route("/setavatar/:id").post(setavatar)
router.route("/getuser/:id").get(getalluser);
router.route("/addmsg/").post(addmessage);
router.route("/getmsgs/").post(getmessage);
router.route("/logout/:id").get(logout);
router.route("/friend/:id").post(getfriend);



module.exports = router