const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  const { todo, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todo (todo, status) VALUES ($1, $2) RETURNING *",
      [todo, status || false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding todo:", err.message);
    res.status(500).send("Server Error");
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todo SET todo = $1, status = $2 WHERE id = $3 RETURNING *",
      [todo, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Todo not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating todo:", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete all todos
router.delete("/all", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM todo RETURNING *");
    if (result.rows.length === 0) {
      return res.status(404).send("No todos found to delete.");
    }
    res.json({ message: "All todos deleted", todos: result.rows });
  } catch (err) {
    console.error("Error deleting todos:", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Todo not found");
    }
    res.json({ message: "Todo deleted", todo: result.rows[0] });
  } catch (err) {
    console.error("Error deleting todo:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
