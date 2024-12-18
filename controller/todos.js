// controller/todos.js
const Todo = require("../model/todo");

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res.status(500).send("Server Error");
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const { todo, status } = req.body;
  try {
    const newTodo = await Todo.create({ todo, status: status || false });
    res.json(newTodo);
  } catch (err) {
    console.error("Error adding todo:", err.message);
    res.status(500).send("Server Error");
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo, status } = req.body;
  try {
    const [updatedRows, [updatedTodo]] = await Todo.update(
      { todo, status },
      {
        where: { id },
        returning: true,
      }
    );
    if (updatedRows === 0) {
      return res.status(404).send("Todo not found");
    }
    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err.message);
    res.status(500).send("Server Error");
  }
};

// Delete all todos
exports.deleteAllTodos = async (req, res) => {
  try {
    const deletedTodos = await Todo.destroy({ where: {} });
    if (deletedTodos === 0) {
      return res.status(404).send("No todos found to delete.");
    }
    res.json({ message: "All todos deleted" });
  } catch (err) {
    console.error("Error deleting todos:", err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.destroy({ where: { id } });
    if (deletedTodo === 0) {
      return res.status(404).send("Todo not found");
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Error deleting todo:", err.message);
    res.status(500).send("Server Error");
  }
};
