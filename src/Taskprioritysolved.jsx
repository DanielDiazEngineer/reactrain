import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * TASK PRIORITY MANAGER - SOLUTION
 */

function TaskPriorityManager() {
    // Mock initial tasks
    const initialTasks = [
        { id: 1, text: 'Fix login bug', priority: 'high', completed: false },
        { id: 2, text: 'Update documentation', priority: 'low', completed: false },
        { id: 3, text: 'Review pull requests', priority: 'medium', completed: true },
        { id: 4, text: 'Deploy to production', priority: 'high', completed: false }
    ];

    // STATE MANAGEMENT
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('medium');
    const [filterPriority, setFilterPriority] = useState('all');

    // HELPER FUNCTIONS

    const handleAddTask = () => {
        // Don't add empty tasks
        if (newTaskText.trim() === '') return;

        const newTask = {
            id: Date.now(), // Simple unique ID
            text: newTaskText,
            priority: newTaskPriority,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setNewTaskText(''); // Clear input
        setNewTaskPriority('medium'); // Reset priority
    };

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const getFilteredTasks = () => {
        if (filterPriority === 'all') {
            return tasks;
        }
        return tasks.filter(task => task.priority === filterPriority);
    };

    const getTaskStats = () => {
        const filteredTasks = getFilteredTasks();
        const completed = filteredTasks.filter(task => task.completed).length;
        const total = filteredTasks.length;
        const incomplete = total - completed;

        return { completed, incomplete, total };
    };

    // Get data for rendering
    const displayedTasks = getFilteredTasks();
    const stats = getTaskStats();

    // RENDER
    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
            <h1>Task Priority Manager</h1>

            {/* ADD TASK SECTION */}
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '5px',
                marginBottom: '20px'
            }}>
                <h3>Add New Task</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter task description..."
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        style={{ flex: 1, padding: '8px', fontSize: '14px' }}
                    />
                    <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        style={{ padding: '8px' }}
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button
                        onClick={handleAddTask}
                        style={{
                            padding: '8px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                        }}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {/* FILTER AND STATS SECTION */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <label>Filter by Priority: </label>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        style={{ padding: '5px' }}
                    >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div style={{ fontSize: '14px', color: '#666' }}>
                    <span style={{ marginRight: '15px' }}>
                        ✅ Completed: <strong>{stats.completed}</strong>
                    </span>
                    <span style={{ marginRight: '15px' }}>
                        ⏳ Incomplete: <strong>{stats.incomplete}</strong>
                    </span>
                    <span>
                        📋 Total: <strong>{stats.total}</strong>
                    </span>
                </div>
            </div>

            {/* TASKS LIST */}
            <div>
                {displayedTasks.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999' }}>
                        No tasks to display. Add one above!
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {displayedTasks.map(task => (
                            <div
                                key={task.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px',
                                    backgroundColor: task.completed ? '#e8f5e9' : '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    borderLeft: `4px solid ${task.priority === 'high' ? '#f44336' :
                                            task.priority === 'medium' ? '#ff9800' :
                                                '#4CAF50'
                                        }`
                                }}
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task.id)}
                                    style={{ marginRight: '15px', cursor: 'pointer' }}
                                />

                                {/* Task Text */}
                                <div style={{ flex: 1 }}>
                                    <span style={{
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? '#999' : '#000'
                                    }}>
                                        {task.text}
                                    </span>
                                </div>

                                {/* Priority Badge */}
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    backgroundColor:
                                        task.priority === 'high' ? '#ffebee' :
                                            task.priority === 'medium' ? '#fff3e0' :
                                                '#e8f5e9',
                                    color:
                                        task.priority === 'high' ? '#c62828' :
                                            task.priority === 'medium' ? '#e65100' :
                                                '#2e7d32'
                                }}>
                                    {task.priority.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TaskPriorityManager />);