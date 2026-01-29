import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

/*
Category Filter Dropdown:

Show all unique categories from products
Include an "All Categories" option
When selected, filter the displayed products


Product Display:

For each product, calculate and show:

Product name
Total quantity across all warehouses
Total revenue from sales
Stock status: "Low Stock" (< 10 total), "In Stock" (10-20), "Well Stocked" (> 20)





Data Transformation Challenge:

Merge data from products, inventory, and sales arrays
Calculate totals by grouping inventory by productId
Match sales data to products
Handle products that might not have sales data (show $0)


Sort Feature:

Add a button to toggle sorting by total quantity (high to low / low to high)


Summary Section:

Show total products displayed
Show total inventory count (all warehouses combined)
Show total revenue across all displayed products
*/

function ProductInventoryDashboard() {
    // Mock data from "API endpoints"
    const mockData = {
        products: [
            { productId: 'P001', name: 'Laptop', category: 'Electronics', basePrice: 1000 },
            { productId: 'P002', name: 'Desk Chair', category: 'Furniture', basePrice: 250 },
            { productId: 'P003', name: 'Monitor', category: 'Electronics', basePrice: 300 },
            { productId: 'P004', name: 'Keyboard', category: 'Electronics', basePrice: 80 },
            { productId: 'P005', name: 'Bookshelf', category: 'Furniture', basePrice: 150 }
        ],

        inventory: [
            { productId: 'P001', warehouseId: 'W1', quantity: 5 },
            { productId: 'P001', warehouseId: 'W2', quantity: 3 },
            { productId: 'P002', warehouseId: 'W1', quantity: 12 },
            { productId: 'P003', warehouseId: 'W1', quantity: 8 },
            { productId: 'P003', warehouseId: 'W3', quantity: 2 },
            { productId: 'P004', warehouseId: 'W1', quantity: 25 },
            { productId: 'P005', warehouseId: 'W2', quantity: 15 }
        ],

        sales: [
            { productId: 'P001', unitsSold: 15, revenue: 15000 },
            { productId: 'P002', unitsSold: 8, revenue: 2000 },
            { productId: 'P003', unitsSold: 20, revenue: 6000 },
            { productId: 'P004', unitsSold: 50, revenue: 4000 }
            // Note: P005 (Bookshelf) has no sales data - handle this edge case!
        ]
    };

    // STATE MANAGEMENT
    // TODO: Add state for:
    // - selectedCategory (string, default: 'All Categories')
    // - sortOrder (string: 'asc' or 'desc', default: 'desc')
    // - searchTerm (string, default: '', BONUS feature)

    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState(''); // BONUS

    // DATA TRANSFORMATION FUNCTIONS

    /**
     * Step 1: Transform and merge all data sources
     * This is the core data transformation challenge!
     * 
     * TODO: Create a function that:
     * 1. Takes each product from mockData.products
     * 2. Finds all inventory entries for that product
     * 3. Sums up the quantities (use .reduce())
     * 4. Finds the sales data for that product
     * 5. Determines stock status based on totalQuantity
     * 6. Returns enriched product object
     * 
     * Hint: Use .map() on products, then .filter() and .reduce() on inventory
     */
    const getEnrichedProducts = () => {





        // TODO: Implement this function
        // Expected output format for each product:
        // {
        //   productId: 'P001',
        //   name: 'Laptop',
        //   category: 'Electronics',
        //   basePrice: 1000,
        //   totalQuantity: 8,
        //   totalRevenue: 15000,
        //   stockStatus: 'Low Stock' // or 'In Stock' or 'Well Stocked'
        // }

        return mockData.products.map(product => {
            // Calculate total quantity across all warehouses for this product
            const totalQuantity = mockData.inventory
                .filter(inv => inv.productId === product.productId)
                .reduce((sum, inv) => sum + inv.quantity, 0);

            // Find sales data for this product (might not exist!)
            const salesData = mockData.sales.find(sale => sale.productId === product.productId);
            const totalRevenue = salesData ? salesData.revenue : 0;

            // Determine stock status
            let stockStatus;
            if (totalQuantity < 10) {
                stockStatus = 'Low Stock';
            } else if (totalQuantity <= 20) {
                stockStatus = 'In Stock';
            } else {
                stockStatus = 'Well Stocked';
            }

            return {
                ...product,
                totalQuantity,
                totalRevenue,
                stockStatus
            };
        });
    };

    /**
     * Step 2: Get unique categories for dropdown
     * 
     * TODO: Extract unique category values from products
     * Hint: Use .map() to get categories, then Set or .filter() for uniqueness
     */
    const getUniqueCategories = () => {
        // TODO: Return array of unique categories
        // Expected output: ['Electronics', 'Furniture']

        const categories = mockData.products.map(product => product.category);
        return [...new Set(categories)]; // Remove duplicates using Set
    };

    /**
     * Step 3: Apply filters and sorting
     * 
     * TODO: Filter by category and searchTerm, then sort by totalQuantity
     */
    const getFilteredAndSortedProducts = () => {
        let products = getEnrichedProducts();

        // Filter by category
        if (selectedCategory !== 'All Categories') {
            products = products.filter(product => product.category === selectedCategory);
        }

        // BONUS: Filter by search term
        if (searchTerm) {
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by totalQuantity
        products.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.totalQuantity - a.totalQuantity;
            } else {
                return a.totalQuantity - b.totalQuantity;
            }
        });

        return products;
    };

    /**
     * Step 4: Calculate summary statistics
     * 
     * TODO: Calculate totals from filtered products
     * - Total number of products
     * - Total inventory count (sum of all quantities)
     * - Total revenue (sum of all revenues)
     */
    const getSummaryStats = (products) => {
        // TODO: Implement this
        // Hint: Use .reduce() to sum quantities and revenues

        const totalProducts = products.length;
        const totalInventory = products.reduce((sum, p) => sum + p.totalQuantity, 0);
        const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0);

        return { totalProducts, totalInventory, totalRevenue };
    };

    // EVENT HANDLERS

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortToggle = () => {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Get processed data for rendering
    const displayedProducts = getFilteredAndSortedProducts();
    const stats = getSummaryStats(displayedProducts);
    const categories = getUniqueCategories();

    // RENDER
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Product Inventory Dashboard</h1>

            {/* CONTROLS SECTION */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* Category Filter Dropdown */}
                <div>
                    <label htmlFor="categoryFilter">Filter by Category: </label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Toggle Button */}
                <button onClick={handleSortToggle}>
                    Sort by Quantity: {sortOrder === 'desc' ? '↓ High to Low' : '↑ Low to High'}
                </button>

                {/* BONUS: Search Bar */}
                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ padding: '5px' }}
                    />
                </div>
            </div>

            {/* SUMMARY SECTION */}
            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '5px'
            }}>
                <h3>Summary</h3>
                <div style={{ display: 'flex', gap: '30px' }}>
                    <div>
                        <strong>Total Products:</strong> {stats.totalProducts}
                    </div>
                    <div>
                        <strong>Total Inventory:</strong> {stats.totalInventory} units
                    </div>
                    <div>
                        <strong>Total Revenue:</strong> ${stats.totalRevenue.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* PRODUCTS LIST */}
            <div>
                <h3>Products</h3>
                {displayedProducts.length === 0 ? (
                    <p>No products found matching your criteria.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {displayedProducts.map(product => (
                            <div
                                key={product.productId}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                                            {product.category} | Base Price: ${product.basePrice}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: product.stockStatus === 'Low Stock' ? 'red' :
                                                product.stockStatus === 'In Stock' ? 'orange' : 'green'
                                        }}>
                                            {product.stockStatus}
                                        </div>
                                        <div style={{ fontSize: '14px', marginTop: '5px' }}>
                                            Quantity: <strong>{product.totalQuantity}</strong> units
                                        </div>
                                        <div style={{ fontSize: '14px' }}>
                                            Revenue: <strong>${product.totalRevenue.toLocaleString()}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ProductInventoryDashboard />);