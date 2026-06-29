
/*Exercise: GitHub Repo Explorer
Build a RepoExplorer that fetches repos from the GitHub API with search, loading/error states, and a detail toggle.
Components:

RepoExplorer (parent) — manages state, handles fetch
RepoList — receives repos as props, maps to RepoCard
RepoCard — displays repo info, click expands to show extra details

Requirements:

Fetch from https://api.github.com/search/repositories?q={query}&sort=stars&per_page=5
Controlled search input with a submit button (don't fetch on every keystroke)
Loading, error, and empty result states
useReducer for fetch state ({ loading, error, data })
useEffect is NOT needed — fetch on button click only
Display: repo name, stars, language, description
Clicking a repo toggles showing its owner.login, forks_count, open_issues_count
 */

import { useReducer, useState } from "react";

const initialState = { loading: false, error: null, data: null };

function fetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            console.log("fetch start")

            return { ...state, loading: true, error: null }
        // loading true, clear error
        case 'FETCH_SUCCESS':
            console.log("fetch sucess")
            return { ...state, loading: false, data: action.payload }
        // loading false, set data
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload }
        // loading false, set error
        default:
            return state;
    }
}

function RepoCard({ repo, isExpanded, onToggle }) {
    // show name, stars, language, description
    // if expanded, show owner, forks, issues

    return (
        <div onClick={() => onToggle(repo.id)} style={{ padding: "3px", border: "solid ", borderRadius: "9px" }}>
            <p>{repo.name}</p>
            <p>{repo.stars}</p>
            {repo.id === isExpanded ? <><p>OWNER: {repo.owner.login}</p><p>FORKS: {repo.forks}</p> <p>ISSUES: {repo.issues}</p></> : null}
        </div>
    )

}

function RepoList({ repos, expandedId, onToggle }) {

    if (repos === null || repos === undefined)
        return

    console.log(repos)
    // map repos → RepoCard
    return (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <ul>
                {
                    repos.items.map((repo) => {

                        return (
                            <li key={repo.id}>
                                <RepoCard repo={repo} isExpanded={expandedId} onToggle={onToggle}></RepoCard>

                            </li>
                        )
                    })

                }

            </ul>
        </div>
    )
}

export default function RepoExplorer() {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    const [query, setQuery] = useState('');
    const [expandedId, setExpandedId] = useState(null);


    function onToggle(id) {

        //  setExpandedId((prev) => prev === id ? null : id)
        setExpandedId((expandedId) => expandedId === id ? null : id)
        // console.log(id)
    }

    const handleSearch = async () => {

        //console.log(query)
        // return

        dispatch({ type: "FETCH_START" })

        try {

            //dont mix then with async with then. the catch should go to try catch not then then.catch
            /*  fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=5`)
                  .then(res => res.json())
                  .then(data => {
                      //console.log(data)
                      dispatch({ type: "FETCH_SUCCESS", payload: data })
  
                  })*/
            const res = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=5`);
            const data = await res.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data })

        } catch (error) {

            dispatch({ type: "FETCH_ERROR", payload: error.message })
            // payload: (error as Error).message });
        }
        // dispatch FETCH_START
        // try fetch → dispatch FETCH_SUCCESS
        // catch → dispatch FETCH_ERROR
    };

    return (
        <div>
            {/* search input + button */}
            <input value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button onClick={handleSearch}>Search</button>
            {/* loading / error / results */}
            {state.error && (<p>Error: {state.error}</p>)}
            {state.loading && (<p>LOADING:</p>)}
            <RepoList repos={state?.data || null} expandedId={expandedId} onToggle={onToggle} />





        </div>
    );
}