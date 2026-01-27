import { useState, useEffect } from 'react';

function usePolling(url, interval) {
    // Your state here

    // Your useEffect here

    // What should you return?
}

// Then use it like:
function Dashboard() {
    const { data, loading, error } = usePolling(
        'https://jsonplaceholder.typicode.com/posts/1',
        5000
    );
    // ...
}

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // BUG: This effect has dependency issues and missing cleanup
    useEffect(() => {
        setLoading(true);
        setError(null); // Clear previous errors
        console.log("Profile mounted")
        const controller = new AbortController();

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal: controller.signal })
            .then(response => response.json()) //is this the standar procedure? in angular i would expect response.data or smething like that
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            controller.abort(); // what is this how to use,
            console.log("Profile unmounted")
        }
    }, [userId]); // TODO: Fix the dependency array


    // Separate effect for mount/unmount logging
    useEffect(() => {
        console.log("Profile mounted");
        return () => console.log("Profile unmounted");
    }, []); // Empty array = runs once on mount

    // TODO: Add effect to log when component mounts/unmounts
    // Should console.log("Profile mounted") on mount
    // Should console.log("Profile unmounted") on unmount

    return (
        <div>
            {/* TODO: Show loading state ONLY while loading */}
            {/* TODO: Show error ONLY if there's an error */}
            {/* TODO: Show user name ONLY when user data exists and not loading */}

            <div>{loading ? "Loading..." : ""}</div>
            <div>{error ? `Error: ${error}` : ""}</div>
            <h2>{!loading && user?.name}</h2>
            <p>{user?.email}</p>
        </div>
    );
}

// Parent component for testing
function UserApp() {
    const [selectedUser, setSelectedUser] = useState(1);

    return (
        <div>
            <button onClick={() => setSelectedUser(1)}>User 1</button>
            <button onClick={() => setSelectedUser(2)}>User 2</button>
            <button onClick={() => setSelectedUser(3)}>User 3</button>

            <UserProfile userId={selectedUser} />
        </div>
    );
}

export default UserApp;