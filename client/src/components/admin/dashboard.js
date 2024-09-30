import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Dashboard = () => {
    const [taskName, setTaskName] = useState('');
    const [taskEmail, setTaskEmail] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch the task list when the component is mounted
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://tms-eta-nine.vercel.app/tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!taskName || !taskEmail) {
            swal("Error", "Please fill in both the task name and email.", "error");
            return;
        }
        try {
            const response = await fetch('https://tms-eta-nine.vercel.app/addTask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskName, taskEmail }),
            });
            const newTask = await response.json();
            console.log('newTask', newTask)
            // Assuming `newTask` contains the newly created task data
            setTasks((prevTasks) => [...prevTasks, newTask.task]);

            if (response.ok) {
                swal("Task Added", "Your task has been added successfully.", "success");
                // Clear the form after successful submission
                setTaskName('');
                setTaskEmail('');
            } else {
                swal("Error", "Failed to add the task.", "error");
            }
        } catch (error) {
            console.error('Error adding task:', error);
            swal("Error", "Something went wrong.", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://tms-eta-nine.vercel.app/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const deletedTask = await response.json();
                // Remove the deleted task from the state
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
                swal("Deleted!", deletedTask.message, "success");
            } else {
                const errorData = await response.json();
                swal("Oops!", errorData.message || "Something went wrong during deletion.", "error");
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            swal("Oops!", "Something went wrong during deletion.", "error");
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <h3>Dashboard</h3>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <h1>Task List</h1>
                </div>
            </div>

            {/* Form to submit the task */}
            <form onSubmit={addTask}>
                <div className='row align-items-center'>
                    <div className='col-md-5'>
                        <div className="mb-3">
                            <label htmlFor="taskName" className="form-label">Task Name</label>
                            <input type="text"
                                className="form-control"
                                id="taskName"
                                placeholder="Enter Task Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className="mb-3">
                            <label htmlFor="taskEmailtoperson" className="form-label">Email Address</label>
                            <input type="email"
                                className="form-control"
                                id="taskEmailtoperson"
                                placeholder="abc@gmail.com"
                                value={taskEmail}
                                onChange={(e) => setTaskEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <button type="submit" className='btn btn-primary'>Add Task</button>
                    </div>
                </div>
            </form>

            {/* Sample Task Table */}
            <div className='row'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <tr key={task._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskEmail}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDelete(task._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};