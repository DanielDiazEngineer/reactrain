/*usereducer- Complexlogicstate
Tasks:

Implement counterReducer with switch statement handling 4 actions
Replace useState with useReducer
Update handlers to use dispatch({ type: 'increment' }) etc.
Handle the step input with dispatch({ type: 'setStep', payload: value })

Key concepts: useReducer for complex state, actions, dispatch
*/

import { useState, useReducer } from 'react';

// TODO: Define reducer function
// Should handle: 'increment', 'decrement', 'reset', 'set'
function counterReducer(state, action) {
    // Your code here
}

function Counter() {
    // BUG: Managing related state separately is messy
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    // TODO: Replace useState with useReducer
    // const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

    const increment = () => {
        setCount(count + step);
    };

    const decrement = () => {
        setCount(count - step);
    };

    const reset = () => {
        setCount(0);
        setStep(1);
    };

    return (
        <div>
            <h2>Count: {count}</h2>
            <input
                type="number"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                placeholder="Step"
            />

            <div>
                <button onClick={increment}>+{step}</button>
                <button onClick={decrement}>-{step}</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;