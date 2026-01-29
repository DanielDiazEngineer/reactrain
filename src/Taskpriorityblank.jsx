import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * ================================================================================
TASK PRIORITY MANAGER - CODING CHALLENGE
OVERVIEW
Build a task management application that allows users to add tasks with different
priority levels, mark them as complete, and filter the view by priority.
INITIAL DATA
You are provided with an array of initial tasks:
const initialTasks = [
{ id: 1, text: 'Fix login bug', priority: 'high', completed: false },
{ id: 2, text: 'Update documentation', priority: 'low', completed: false },
{ id: 3, text: 'Review pull requests', priority: 'medium', completed: true },
{ id: 4, text: 'Deploy to production', priority: 'high', completed: false }
];
Each task object has:

id: unique identifier (number)
text: task description (string)
priority: 'low', 'medium', or 'high' (string)
completed: completion status (boolean)

REQUIREMENTS

ADD TASK FUNCTIONALITY

Display an input field for task description
Display a dropdown to select priority (low, medium, high)
Display an "Add Task" button
When the button is clicked:

Create a new task with the entered text and selected priority
Set completed to false
Generate a unique ID (you can use Date.now())
Add the task to the tasks list
Clear the input field
Reset the priority dropdown to 'medium'


Do NOT add empty tasks (validate that text is not empty or whitespace)
BONUS: Allow pressing Enter in the input field to add the task


DISPLAY TASKS

Show all tasks in a list
For each task, display:

A checkbox showing completion status
The task text
The priority level


Apply visual styling:

Completed tasks should have a strikethrough on the text
Each priority level should have a distinct color indicator
Completed tasks should have a different background color




TOGGLE COMPLETION

When a user clicks the checkbox, toggle that task's completed status
The visual styling should update immediately (strikethrough, background)
Other tasks should remain unchanged


FILTER BY PRIORITY

Display a dropdown with options: All, High, Medium, Low
When a filter is selected:

Show only tasks matching the selected priority
If "All" is selected, show all tasks


Filtering should update the display immediately


STATISTICS DISPLAY

Show three statistics based on the FILTERED tasks:

Number of completed tasks
Number of incomplete tasks
Total number of tasks (in current filter)


These statistics should update automatically when:

Tasks are added
Tasks are marked complete/incomplete
Filter is changed




EMPTY STATE

When no tasks match the current filter, display a message:
"No tasks to display. Add one above!"



TECHNICAL REQUIREMENTS

Use React hooks (useState)
Use proper key props when rendering lists
Handle state updates immutably (do not mutate arrays/objects directly)
Ensure all form inputs are controlled components

ELEMENT IDs (for testing)
You don't need to add specific IDs, but ensure:

The input field has proper value and onChange bindings
The priority dropdown has proper value and onChange bindings
The filter dropdown has proper value and onChange bindings
Each task uses its id as the key prop

HINTS

For adding tasks: [...tasks, newTask]
For toggling completion: tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task)
For filtering: tasks.filter(task => filterPriority === 'all' || task.priority === filterPriority)
For stats: Use .filter().length or .reduce()

EXPECTED BEHAVIOR EXAMPLES
Example 1: Adding a task

User types "Write unit tests"
User selects "high" priority
User clicks "Add Task"
Result: New task appears at bottom of list with high priority indicator, unchecked

Example 2: Marking complete

User clicks checkbox next to "Fix login bug"
Result: Text gets strikethrough, background changes, completed count increases

Example 3: Filtering

User selects "High" from filter dropdown
Result: Only "Fix login bug" and "Deploy to production" are visible
Stats show counts for only those 2 tasks

Example 4: Empty validation

User clicks "Add Task" without typing anything
Result: Nothing happens (no empty task added)

BONUS CHALLENGES

Add a delete button for each task
Allow editing task text by double-clicking
Add a "Clear Completed" button to remove all completed tasks
Persist tasks to localStorage
Add sorting options (by priority, by date added, alphabetically)
 * 
 * 
 * TASK PRIORITY MANAGER CHALLENGE
 * 
 * Build a simple task manager where users can:
 * 1. Add new tasks with a priority level
 * 2. Mark tasks as complete/incomplete
 * 3. Filter tasks by priority
 * 4. See a count of completed vs incomplete tasks
 * 
 * This is a smaller challenge focused on:
 * - Managing array state (adding, updating items)
 * - Filtering data for display
 * - Rendering lists with conditional styling
 * - Simple data aggregation
 */

export function TaskPriorityManager() {
    // Mock initial tasks
    const initialTasks = [
        { id: 1, text: 'Fix login bug', priority: 'high', completed: false },
        { id: 2, text: 'Update documentation', priority: 'low', completed: false },
        { id: 3, text: 'Review pull requests', priority: 'medium', completed: true },
        { id: 4, text: 'Deploy to production', priority: 'high', completed: false }
    ];

    // STATE MANAGEMENT
    // TODO: Initialize state for:
    // - tasks: array of task objects (start with initialTasks)
    // - newTaskText: string for the input field
    // - newTaskPriority: string for priority dropdown (default: 'medium')
    // - filterPriority: string for filtering display (default: 'all')
    const [tasks, setTasks] = useState(initialTasks)
    const [newTaskText, setNewTaskText] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState('medium')
    const [filterPriority, setFilterPriority] = useState('all')

    // HELPER FUNCTIONS

    /**
     * Add a new task
     * 
     * TODO: Create a function that:
     * 1. Creates a new task object with:
     *    - id: Use Date.now() for a simple unique ID
     *    - text: from newTaskText state
     *    - priority: from newTaskPriority state
     *    - completed: false (always start incomplete)
     * 2. Adds it to the tasks array
     *    Hint: setTasks([...tasks, newTask])
     * 3. Clears the input field (setNewTaskText(''))
     * 4. Resets priority to 'medium'
     * 
     * Edge case: Don't add if newTaskText is empty or just whitespace
     * Hint: Use .trim() to check
     */
    const handleAddTask = () => {
        // TODO: Implement

        let newTask = {
            id: Date.now(),
            text: newTaskText,
            priority: newTaskPriority,
            completed: false
        }

        setTasks([...tasks, newTask]);
        setNewTaskText('');  // Clear input
        setNewTaskPriority('medium');  // Reset priority



    };

    /**
     * Toggle task completion status
     * 
     * TODO: Create a function that:
     * 1. Takes a task id as parameter
     * 2. Updates the tasks array by mapping through it
     * 3. When you find the matching id, toggle its 'completed' property
     * 4. Return the updated task for that item, unchanged for others
     * 
     * Hint: setTasks(tasks.map(task => 
     *   task.id === id ? { ...task, completed: !task.completed } : task
     * ))
     */
    const handleToggleComplete = (taskId) => {
        // TODO: Implement

        setTasks(tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    /**
     * Get filtered tasks for display
     * 
     * TODO: Filter tasks based on filterPriority state
     * - If filterPriority is 'all', return all tasks
     * - Otherwise, return only tasks matching the selected priority
     * 
     * Hint: Use tasks.filter(task => ...)
     */
    const getFilteredTasks = () => {
        // TODO: Implement

        return tasks.filter(task =>
            filterPriority === 'all' || task.priority === filterPriority
        );
    };

    /**
     * Calculate task statistics
     * 
     * TODO: Count completed and incomplete tasks from filtered list
     * 
     * Hint: Use .filter() to get completed tasks, then check .length
     * Or use .reduce() to count in one pass
     * 
     * Return object with: { completed: number, incomplete: number, total: number }
     */
    const getTaskStats = () => {
        const filteredTasks = getFilteredTasks();



        const completed = filteredTasks.filter(task => task.completed).length;
        const incomplete = filteredTasks.filter(task => !task.completed).length;
        const total = filteredTasks.length;

        return { completed, incomplete, total };

        const stats = filteredTasks.reduce((acc, task) => {
            if (task.completed) {
                acc.completed++;
            } else {
                acc.incomplete++;
            }
            acc.total++;
            return acc;
        }, { completed: 0, incomplete: 0, total: 0 });

        return stats;
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
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<TaskPriorityManager />);