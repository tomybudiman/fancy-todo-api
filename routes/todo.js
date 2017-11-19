const router=require("express").Router();
const todoControll=require("../controllers/todoControll");

// Add todo current user
router.post("/add",todoControll.add);

// Return all todo list current user
router.post("/all",todoControll.all);

// Return todo with unique id
router.post("/get",todoControll.findOne);

// Update todo with unique id
router.put("/edit",todoControll.update);

// Delete todo with unique id
router.post("/delete",todoControll.delete);

module.exports=router;
