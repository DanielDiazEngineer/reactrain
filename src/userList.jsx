/*
Exercise: Status Badge List
Build two components where a parent passes data and a callback down to a child.
Parent — UserList:

Has a useState array of users: [{id, name, online: bool}]
Renders a list of UserBadge components
Passes name, online, and a toggleOnline callback as props

Child — UserBadge:

Receives props, displays the name
Shows "🟢 Online" or "🔴 Offline" conditionally
Clicking it calls toggleOnline to flip the status in the parent*/

import { useState } from "react";

const initialUsers = [
    { id: 1, name: 'Alice', online: true },
    { id: 2, name: 'Bob', online: false },
    { id: 3, name: 'Carol', online: true },
];

function UserBadge({ name, online, toggleOnline }) {
    // render name + status, onClick calls toggleOnline
    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            border: '3px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
        }}>
            <p>{name}</p>
            <p style={online ? { "color": "red" } : { "color": "green" }}>{online ? " o ONLINE" : "o OFFLINE"}</p>
            <button onClick={toggleOnline}>Toggle</button>
        </div>

    )
}

export default function UserList() {
    const [users, setUsers] = useState(initialUsers);

    const handleToggle = (id) => {
        // flip the online status for that id
        // let status = users[id].online === true ? false : true //error its the index of array not index of property


        let newusers = users.map((user) => {

            if (user.id === id) {
                //might cause bugs, avoid mutating directly
                //user.online = user.online === true ? false : true
                return { ...user, online: user.online === true ? false : true }
            }
            return user
        }
        )

        setUsers(newusers)
        //Best approach
        // setUsers(users.map(u => u.id === id ? { ...u, online: !u.online } : u));
    };

    return (
        <div style={{ display: 'grid', gap: '10px', margin: '0 auto', maxWidth: '400px', }}>
            {users.map((user) =>
                <UserBadge name={user.name} online={user.online} toggleOnline={() => handleToggle(user.id)} >userbadge</UserBadge>
            )}
        </div>
    )
}