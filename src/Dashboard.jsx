import { useState, useEffect } from 'react';

// TODO: Extract this logic into a custom hook called `usePolling`
// It should accept: url, interval (in ms)
// It should return: { data, loading, error }

function usePolling(url, interval, isActive) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [isActive, setIsActive] = useState(true);


    useEffect(() => {
        // BUG: This has multiple issues with cleanup and intervals
        const fetchData = () => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => setError(err.message));
        };

        if (!isActive) {

            //CLEAR INTERVAL?
            return
        }

        fetchData(); // Initial fetch

        const intervalvar = setInterval(() => {
            fetchData();
        }, interval);

        return () => {
            clearInterval(intervalvar)

            console.group("Unmount");
        }

        // TODO: Add cleanup
    }, [url, interval, isActive]); // TODO: Should polling respect the `isActive` state?
    //requiere more explaining

    return [data, loading, error]


}

function Dashboard() {

    const [isActive, setIsActive] = useState(true);
    const url = "https://jsonplaceholder.typicode.com/posts/1"

    let interval = 5000;
    const [data, loading, error] = usePolling(url, interval, isActive);


    return (
        <div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Resume'} Polling
            </button>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && <div>Latest: {data.title}</div>}
        </div>
    );
}

export default Dashboard;