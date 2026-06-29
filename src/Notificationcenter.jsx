/*Exercise: Notification Center
Build three components: NotificationCenter → NotificationList → NotificationItem.
NotificationCenter (parent):

useState for notifications array
useState for filter: "all" / "unread" / "read"
A markAsRead(id) callback that updates a notification's read property (immutably!)
A dismissAll function that removes all read notifications
Displays unread count at the top

NotificationList (middle):

Receives filtered notifications and callbacks
If empty, show "No notifications" message
Maps to NotificationItem components

NotificationItem (child):

Receives message, type, read, timestamp, onMarkRead
Style differently based on type: "info" / "warning" / "error"
Unread items have a bold style; read items are dimmed
Click calls onMarkRead

Practice points: Immutable updates, filtering, props drilling callbacks, multiple conditional styles, derived state (unread count without separate useState).
*/

import { useState } from "react";

const initialNotifications = [
    { id: 1, message: 'Deployment successful', type: 'info', read: false, timestamp: Date.now() - 60000 },
    { id: 2, message: 'CPU usage above 90%', type: 'warning', read: false, timestamp: Date.now() - 30000 },
    { id: 3, message: 'Database connection failed', type: 'error', read: false, timestamp: Date.now() },
    { id: 4, message: 'New user registered', type: 'info', read: true, timestamp: Date.now() - 120000 },
];

function NotificationItem({ message, type, read, timestamp, onMarkRead, notification }) {
    // conditional styling by type + read status
    // console.log(notification)
    let textcolor
    switch (type) {
        case ("info"):
            textcolor = "green"
            break
        case ("warning"):
            textcolor = " yellow"
            break
        case ("error"):
            textcolor = "red"
            break
        default:
            textcolor = "black"
            break
    }



    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1px", verticalAlign: "center", alignItems: "center", margin: "10px", border: ".2px solid", padding: "14px", borderRadius: "5px" }}>

                <p style={{
                    "fontWeight": notification.read ? "100" : "bold",
                    color: textcolor
                }}  >
                    {notification.message} </p>
                <p>{notification.read ? "READ" : "NOT READ"} </p>
                <p>{new Date(notification.timestamp).toLocaleTimeString()}</p>
                <p>{notification.read}</p>
                <button onClick={() => { onMarkRead(notification.id) }}>Mark as Read</button>
            </div >
        </>

    )
}

function NotificationList({ notifications, onMarkRead }) {
    // empty state + map
    //console.log(notifications)

    return (
        <>


            {notifications.length === 0 ?
                <p>No notifications</p>
                :
                (
                    <div style={{ maxWidth: "700px", margin: "0 auto", display: "grid", alignItems: "center" }}>
                        {notifications.map((notis) =>
                            <NotificationItem key={notis.id} type={notis.type} timestamp={notis.timestamp} notification={notis} onMarkRead={onMarkRead} />
                        )}
                    </div>
                )
            }


        </>
    )
}


export default function NotificationCenter() {
    // state, filter logic, markAsRead, dismissAll

    const [notifications, setNotifications] = useState(initialNotifications)
    const [filter, setFilter] = useState("All")


    function markAsRead(id) {

        setNotifications(notifications.map((noti) =>
            noti.id === id ? { ...noti, read: true } : noti

        ))

    }

    function dismissAll() {

        let newnotis = notifications.filter((noti) => noti.read === false)

        setNotifications(newnotis)


    }

    function handlefilter(e) {

        console.log(e.target.value)
        setFilter(e.target.value)

    }

    let filternotes = notifications.filter((noti) => filter === "All" ? true : noti.type === filter)
    console.log(filternotes)

    return (<>
        <p>Count</p>
        <button onClick={dismissAll}>Dismiss All Read</button>
        <p>{notifications.filter(n => !n.read).length}</p>

        <select onChange={handlefilter}
            value={filter}
        >
            <option
                value="All"
            >all</option>
            <option
                value="info"
            >info</option>
            <option
                value="warning"
            >warning</option>
            <option
                value="error"
            >errpr</option>
        </select>

        <NotificationList notifications={filternotes} onMarkRead={markAsRead} />
    </>
    )

}