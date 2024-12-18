const express = require("express");
const router = express.Router();
const controller = require("../controller/todos");

router.get("/", controller.getAllTodos);
router.post("/", controller.addTodo);
router.put("/:id", controller.updateTodo);
router.delete("/all", controller.deleteAllTodos);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
