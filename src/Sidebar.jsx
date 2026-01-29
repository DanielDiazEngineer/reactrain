/*
Context API - Avoiding Prop Drilling

Tasks:

Create ThemeContext with createContext()
Wrap App contents in <ThemeContext.Provider value={{ theme, toggleTheme }}>
Use useContext(ThemeContext) in Header, Sidebar, Content
Add toggle button in Header

Key concepts: Context creation, Provider, useContext, avoiding prop drilling
*/

import { useState, createContext, useContext } from 'react';

// TODO: Create ThemeContext
const ThemeContext = createContext();

function Appcontext() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        console.log("toogled+" + theme)
    };

    // TODO: Wrap children in ThemeContext.Provider
    // Pass { theme, toggleTheme } as value

    return (
        <div style={{
            background: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
            minHeight: '100vh'
        }}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Header />
                <Main />
            </ThemeContext.Provider>
        </div>
    );
}

// BUG: These components need theme but it's not passed as props
function Header() {
    // TODO: Use useContext to get theme
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header>
            <h1>My App (Theme: {theme})</h1>
            <button onClick={() => toggleTheme()} >Toggle </button>
            {/* TODO: Add button to toggle theme */}
        </header>
    );
}

function Main() {
    return (
        <div>

            <Sidebar />
            <Content />
        </div>
    );
}

function Sidebar() {
    // TODO: Use useContext to access theme
    const { theme, toggleTheme } = useContext(ThemeContext);


    return <aside>Sidebar (Theme: {theme})</aside>;
}

function Content() {
    // TODO: Use useContext to access theme
    const { theme, toggleTheme } = useContext(ThemeContext);

    return <main>Content (Theme: {theme})</main>;
}

export default Appcontext;