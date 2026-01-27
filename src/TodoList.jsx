function TodoList({ todos, onToggle }) {
    return (
        <ul>
            {/* TODO: Render the todos list here */}
            {todos.map((todo =>
                <li key={todo.id} className={todo.completed == true ? 'Todo-completed' : 'watever'}>
                    <button onClick={() => onToggle(todo.id)}>
                        {todo.text}
                    </button>
                </li>


            ))}
            {/* Each todo should show its text and call onToggle when clicked */}
            {/* Apply a style or className when todo.completed is true */}
        </ul>
    );
}

export default TodoList;