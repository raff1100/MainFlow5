const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a task
app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
