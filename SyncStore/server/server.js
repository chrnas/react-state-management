// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow CORS for your frontend
app.use(express.json()); // Parse JSON bodies

// Fake user data
let fakeUsers = {
  "1": { id: 1, name: "Alice Anderson", email: "alice@example.com" },
  "2": { id: 2, name: "Bob Brown", email: "bob@example.com" },
};

let nextId = 457; // For auto-generating IDs

// GET /users/:id - Get user by ID
app.get("/users/:id", (req, res) => {
  const user = fakeUsers[req.params.id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// POST /users - Create new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  
  const newUser = {
    id: nextId.toString(),
    name,
    email
  };
  
  fakeUsers[newUser.id] = newUser;
  nextId++;
  
  res.status(201).json(newUser);
});

// PUT /users/:id - Update user
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = fakeUsers[userId];
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  const { name, email } = req.body;
  
  // Update user data
  const updatedUser = {
    ...user,
    ...(name && { name }),
    ...(email && { email })
  };
  
  fakeUsers[userId] = updatedUser;
  res.json(updatedUser);
});

// DELETE /users/:id - Delete user
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  
  if (!fakeUsers[userId]) {
    return res.status(404).json({ error: "User not found" });
  }
  
  delete fakeUsers[userId];
  res.status(204).send(); // No content
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Fake user API server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /users/:id`);
  console.log(`  POST   /users`);
  console.log(`  PUT    /users/:id`);
  console.log(`  DELETE /users/:id`);
});
