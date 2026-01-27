import { useState, useCallback, useEffect, React } from 'react';

// This is an expensive component that you don't want re-rendering unnecessarily
const ExpensiveList = React.memo(function ExpensiveList({ items, onItemClick }) {
    console.log('ExpensiveList rendered!');

    return (
        <ul>
            {items.map(item => (
                <li key={item.id} onClick={() => onItemClick(item.id)}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
});



function SearchApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [items] = useState([
        { id: 1, name: 'React' },
        { id: 2, name: 'Angular' },
        { id: 3, name: 'Vue' }
    ]);
    const [selectedId, setSelectedId] = useState(null);

    // BUG: This function is recreated on every render
    const handleItemClick2 = (id) => {
        // setSelectedId(id);
        // console.log('Item clicked:', id);
    };


    const handleItemClick = useCallback((id) => {
        setSelectedId(id);
        console.log('Item clicked:', id);
    }, []);

    return (
        <div>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type anything..."
            />

            <p>Selected: {selectedId}</p>

            {/* TODO: Why does ExpensiveList re-render when you type in the search box? */}
            <ExpensiveList items={items} onItemClick={handleItemClick} />
        </div>
    );
}

export default SearchApp;