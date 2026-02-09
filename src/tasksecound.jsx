/*
Build a TaskTracker component that:

Has a controlled form with an input for task name and a select for priority (High/Medium/Low)
On submit, adds the task to a list with a timestamp via useState
Displays tasks in a list, color-coded by priority (conditional rendering)
Has a filter dropdown to show All/High/Medium/Low tasks
Uses useEffect to save tasks to a counter that displays "You have X pending tasks" — and updates the document title with that count

Requirements to hit:

useState — form inputs, task list, filter selection
useEffect — sync document title with task count
Controlled form — input + select bound to state
List rendering — .map() with keys
Conditional rendering — color/style by priority, empty state message when no tasks match filter*/

import { useEffect, useState } from "react";

const initialTasks = [
    { id: 1, name: 'Fix login bug', priority: 'High', completed: false },
    { id: 2, name: 'Update documentation', priority: 'Low', completed: false },
    { id: 3, name: 'Review pull requests', priority: 'Medium', completed: true },
    { id: 4, name: 'Deploy to production', priority: 'High', completed: false }
];
const priorityCategories = [

    "High",
    "Medium",
    "Low"
]


export default function TaskTracker() {
    const [tasks, setTasks] = useState(initialTasks);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [filter, setFilter] = useState('All');


    useEffect(() => {
        // Update document.title with task count
        let count = tasks.length
        document.title = `YOU HAVE ${count} PENDING tasks`
    }, [tasks]);



    const handleSubmit = (e) => {
        e.preventDefault();   /* add task */
        let newtask = {
            id: Date.now(),
            name: taskName,
            priority: priority
        }

        let newtasks = [...tasks, newtask]

        //setTasks(tasks.push(newtask))
        setTasks(newtasks)

    };

    const filteredTasks = () => {


        return tasks.filter((task) => task.priority === filter || filter === "All")


    }/* filter logic */;

    return (
        // Build the UI
        <>
            <title id="title"></title>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    value={taskName}
                    onChange={(e) => { setTaskName(e.target.value) }}
                >
                </input>
                <select
                    placeholder="medium"
                    value={priority}
                    onChange={(e) => { setPriority(e.target.value) }}>
                    {priorityCategories.map((cat) =>
                        <option key={cat} value={cat}>
                            {cat}
                        </option>

                    )
                    }

                </select>
                <button type="submit">
                    Add task
                </button>


            </form >

            {//filter select
            }
            <select
                placeholder="medium"
                value={filter}
                onChange={(e) => { setFilter(e.target.value) }}>
                <option key={"All"} value={"All"}>
                    {"All"}</option>
                {priorityCategories.map((cat) =>
                    <option key={cat} value={cat}>
                        {cat}
                    </option>

                )
                }

            </select>


            {//diplay tasks
            }
            < ul >
                {
                    filteredTasks().map((task) => {
                        return (
                            <li key={task.id} style={{
                                color:
                                    task.priority === "High" ? '#c66666' : '#0e0d0d'
                            }}>
                                {task.name}
                            </li>

                        )
                    })

                }

            </ul >
        </>
    );
}