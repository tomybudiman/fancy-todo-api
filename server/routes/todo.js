const router=require("express").Router();
const todoControll=require("../controllers/todoControll");

// Add todo current user
router.post("/add",todoControll.add);

// Return all todo list current user
router.get("/all",todoControll.all);

// Return todo with specific id
router.post("/get/:todoId",todoControll.findOne);

// Update todo with unique id
router.put("/edit",todoControll.update);

// Delete todo with unique id
router.delete("/delete/:id",todoControll.delete);

module.exports=router;
