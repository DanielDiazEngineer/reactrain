import { useState } from 'react';
import TodoList from './TodoList';

function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Practice interviews', completed: true },
        { id: 3, text: 'Build projects', completed: false }
    ]);
    const [filter, setFilter] = useState('all');
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {

        if (inputValue == null)
            return;

        let count = 0;
        if (todos.Count > 0) {
            count = todos.at(-1).id;
        }


        //TODO if inputvalue is empty dont add

        todos.setTodos(...todos, {
            id: count + 1,
            text: inputValue,
            completed: false
        })


        //inputValue = ''//null; // '' this didnnt work
        setInputValue(null)
        // TODO: Complete this function
        // Should add a new todo with unique id, the inputValue as text, 
        // completed: false, and clear the input

    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // BUG: This filtering logic isn't working correctly
    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;

        return false; //just this??
    });

    const handleinput = (event) => {
        setInputValue(event.target.value)
    }


    return (
        <div>
            <input
                value={inputValue}
                // TODO: Add the correct event handler here
                onChange={handleinput}
                //(e)=>  setInputValue(e.target.value)

                // //tried this first {() =>  setInputValue(value)}
                //{setInputValue(inputValue)}  this created infinitite loop

                placeholder="Add a todo..."
            />
            <button onClick={addTodo}>Add</button>

            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>

            <TodoList todos={filteredTodos} onToggle={toggleTodo} />
        </div>
    );
}

export default TodoApp;