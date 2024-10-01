const dotenv = require('dotenv');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const userSchema = require('./model/userSchema');
const cookieParser = require("cookie-parser");


// Load environment variables from .env file
dotenv.config({ path: './.env' });
const bcrypt = require('bcrypt');
const Task = require('./model/taskSchema');
app.use(cookieParser());


app.use(cors({
    origin: '*', // Replace with your frontend origin
    credentials: true // Allow credentials (cookies) to be sent
}));

app.options('*', cors({
    origin: '*',
    credentials: true
}));
// app.use(cors({
//     origin: 'https://tms-y3hq.vercel.app/', // Replace with your frontend origin
//     credentials: true // Allow credentials (cookies) to be sent
// }));

// app.options('*', cors({
//     origin: 'https://tms-y3hq.vercel.app/',
//     credentials: true
// }));


// Convert data to JSON
app.use(express.json());

// Database Connection
require('./db/connection')

app.get('/', (req, res) => {
    res.send('Home');
});

// Register route
app.post('/register', async (req, res) => {
    const { name, role, email, password } = req.body;
    try {
        const userExists = await userSchema.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const newUser = new userSchema({ name, role, email, password });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// login api
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('enter login api')
    try {
        // Check if the user exists
        const user = await userSchema.findOne({ email });
        console.log('check user found', user)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('check password Match from bcypt', passwordMatch)

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } else {
            res.status(200).json({ message: "login Successfully", user })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST /tasks - Add a new task
app.post('/addTask', async (req, res) => {
    const { taskName, taskEmail } = req.body;
    if (!taskName || !taskEmail) {
        return res.status(400).json({ message: 'Task name and email are required' });
    }

    try {
        const task = new Task({
            taskName,
            taskEmail,
        });
        await task.save();
        res.status(201).json({ message: 'Task added successfully', task });
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// GET /tasks - Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete task API
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});