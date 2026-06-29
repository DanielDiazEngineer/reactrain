/*
Exercise: Theme & Auth Context
Build an app where two separate contexts provide theme and auth state, consumed by deeply nested components — no prop drilling.
ThemeContext:

Provides theme ("light" / "dark") and toggleTheme

AuthContext:

Provides user (null or {name}) and login / logout functions

Components (4 levels deep):

App → wraps providers
Layout → renders Header and Content (passes nothing)
Header → consumes AuthContext to show user name or "Guest", has login/logout button
Content → consumes ThemeContext to show current theme, has toggle <button></button>
*/


import { useState, useContext, createContext } from "react";

const ThemeContext = createContext();
const AuthContext = createContext();

function Header() {
    const { user, login, logout } = useContext(AuthContext)

    if (user === null || user === undefined)
        return (
            <>
                <p>"GUEST"</p>
                <button onClick={login}>LOGIN</button>
            </>

        )

    return (

        <div>

            <p>{user.name}</p>
            <button onClick={() => logout()}>LOGGOUT</button>



        </div>
    )

    // show user name or "Guest" + login/logout button
}

function Content() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (

        <>
            <p style={{ color: theme === "light" ? "grey" : "black" }}>{theme}</p>
            <button onClick={() => toggleTheme()}>TOGGLE</button>
        </>
    )
    // show current theme + toggle button
}

function Layout() {
    // renders Header and Content — NO props passed
    return (
        <div>
            <Header />
            <Content />
        </div>
    );
}

export default function AuthContextApp() {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(null);

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
    const login = () => setUser({ name: 'DancingApps' });
    const logout = () => setUser(null);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <AuthContext.Provider value={{ user, login, logout }}>

                <Layout></Layout>


            </AuthContext.Provider>
        </ThemeContext.Provider>
        // Wrap Layout with both providers
        // ThemeContext.Provider value={...}
        // AuthContext.Provider value={...}
    );
}