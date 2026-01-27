import { useState, useEffect } from 'react';
import './App.css';


const KEY = 'asdfasdf'

export default function App() {
    const [inputValue, SetInputValue] = useState('')
    const [suggestions, SetSuggestions] = useState([])
    //let suggestions: string[]=[];

    // Move API call to useEffect that watches inputValue
    useEffect(() => {
        if (!inputValue) {
            SetSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            fetch(`https://ac.234523452345.com/v1/autocomplete/${inputValue}?key=${KEY}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // Fix: Correct path to data
                    SetSuggestions(data.sections?.[0]?.suggestions || []);
                })
                .catch(err => console.error(err));
        }, 300); // Debounce API calls

        return () => clearTimeout(timer);
    }, [inputValue]);


    return (
        <div className="App">
            <input
                value={inputValue}
                onChange={e => SetInputValue(e.target.value)}
            />
            <ul>
                {suggestions.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}


