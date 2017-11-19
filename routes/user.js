const router=require("express").Router();
const userControll=require("../controllers/userControll");

router.post("/add",userControll.add);
router.post("/verify",userControll.verify);

module.exports=router;
