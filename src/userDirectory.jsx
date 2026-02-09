/*
Build a UserDirectory component that:

Fetches users from https://jsonplaceholder.typicode.com/users on mount with useEffect + fetch
Shows a loading state while fetching and an error state if it fails
Displays users in a list showing name, email, and company
Has a controlled search input that filters users by name (case-insensitive)
Clicking a user toggles showing their full address (conditional rendering)

Requirements to hit:

useState — users, loading, error, search input, selected user
useEffect — fetch on mount with cleanup
Controlled form — search input bound to state
List rendering — .map() with keys
Conditional rendering — loading/error/data states, expanded user details
fetch API — GET request with .then() or async/await*/

import { useEffect, useState } from "react";

export default function UserDirectory() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        console.log("hi")
        setLoading(true)
        setError(null)
        const abortcontroller = new AbortController();
        let timeout = setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/users', { signal: abortcontroller.signal })
                .then(res => res.json())
                .then(data => {

                    console.log(data)
                    setLoading(false)
                    setUsers(data.length > 0 ? data : [])
                }).catch((err) => {
                    if (err.name !== "AbortError") {
                        console.log(err)
                        setError(err)
                    }
                })
        }, 888)
        // fetch from https://jsonplaceholder.typicode.com/users
        // handle loading, success, and error states
        // return cleanup (AbortController)
        return () => {
            clearTimeout(timeout)
            abortcontroller.abort()
            setLoading(false)

        }
    }, []);

    // const filteredUsers = /* filter by search */;

    return (
        <>
            <div>
                {loading ?
                    (
                        <div>
                            LOADING.....
                        </div>) : null
                }
            </div>

            <div>{error ? error.message : null}</div>

            <ul>
                {users.map((user) =>
                    <li key={user.id}>
                        {user.name}
                    </li>
                )}
            </ul>
        </>
        // loading state → spinner/message
        // error state → error message
        // data state → search input + user list
    );
}