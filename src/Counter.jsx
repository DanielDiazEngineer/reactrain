/*usereducer- Complexlogicstate
Tasks:

Implement counterReducer with switch statement handling 4 actions
Replace useState with useReducer
Update handlers to use dispatch({ type: 'increment' }) etc.
Handle the step input with dispatch({ type: 'setStep', payload: value })

Key concepts: useReducer for complex state, actions, dispatch
*/

import { useState, useReducer, } from 'react';

// TODO: Define reducer function
// Should handle: 'increment', 'decrement', 'reset', 'set'
function counterReducer(state, action) {
    // Your code here
    switch (action.type) {
        case ('increment'):
            return { ...state, count: state.count + state.step }
        case ('decrement'):
            return { ...state, count: state.count - state.step }
        case ('reset'):
            return { count: 0, step: 1 }
        case ('setStep'):
            return { count: state.count, step: action.payload }
        default:
            return state;


    }

}

function Counter() {
    // BUG: Managing related state separately is messy
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);

    // TODO: Replace useState with useReducer
    //const [state, dispatch] = useReducer(reducer, initialState);
    const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

    /* const increment = () => {
         setCount(count + step);
     };
 
     const decrement = () => {
         setCount(count - step);
     };
 
     const reset = () => {
         setCount(0);
         setStep(1);
     };*/
    //dispatch({ type: 'increment' })



    return (
        <div>
            <h2>Count: {state.count}</h2>
            <input
                type="number"
                value={state.step}
                onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
                placeholder="Step"
            />

            <div>
                <button onClick={() => dispatch({ type: 'increment' })}>+{state.step}</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-{state.step}</button>
                <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;