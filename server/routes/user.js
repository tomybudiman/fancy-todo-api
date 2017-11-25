const router=require("express").Router();
const userControll=require("../controllers/userControll");

// Login with Facebook
router.get("/access/check",userControll.add);

// Verify Login Token
router.get("/access/verify",userControll.verify);

module.exports=router;
