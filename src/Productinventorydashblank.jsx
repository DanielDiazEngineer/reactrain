import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

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


    // DATA TRANSFORMATION FUNCTIONS

    /**
     * Step 1: Transform and merge all data sources
     * This is the core data transformation challenge!
     * 
     * TODO: Create a function that returns an array of enriched products
     * 
     * For each product, you need to:
     * 1. Find all inventory entries where productId matches
     *    Hint: mockData.inventory.filter(inv => inv.productId === product.productId)
     * 
     * 2. Sum up all the quantities from those inventory entries
     *    Hint: Use .reduce((sum, inv) => sum + inv.quantity, 0)
     * 
     * 3. Find the sales data for this product
     *    Hint: mockData.sales.find(sale => sale.productId === product.productId)
     *    Remember: sales data might not exist! Use optional chaining or check if undefined
     * 
     * 4. Determine stock status based on totalQuantity:
     *    - Less than 10: 'Low Stock'
     *    - 10 to 20 (inclusive): 'In Stock'
     *    - More than 20: 'Well Stocked'
     * 
     * 5. Return a new object with all product properties plus:
     *    - totalQuantity (number)
     *    - totalRevenue (number, 0 if no sales data)
     *    - stockStatus (string)
     * 
     * Expected output format:
     * [
     *   {
     *     productId: 'P001',
     *     name: 'Laptop',
     *     category: 'Electronics',
     *     basePrice: 1000,
     *     totalQuantity: 8,
     *     totalRevenue: 15000,
     *     stockStatus: 'Low Stock'
     *   },
     *   ...
     * ]
     */
    const getEnrichedProducts = () => {
        // TODO: Implement this function
        // Start with: return mockData.products.map(product => { ... });

        const enrichedproducts = mockData.products.map(product => {

            const currentinventory = mockData.inventory.filter(inv => product.productId === inv.productId)

            const totalquantity = currentinventory.reduce((acc, inv) => { return acc + inv.quantity }, 0)

            const sales = mockData.sales.find(rev => rev.productId == product.productId) //vs filter retunr an array[ {} ]

            let stock;
            if (totalquantity < 10) stock = "Low Stock"
            else if (totalquantity <= 20) stock = "In Stock"
            else stock = "wellsticked"

            return {
                ...product,
                totalQuantity: totalquantity,
                totalRevenue: sales?.revenue || 0,
                stockStatus: stock

            }

        })
        return enrichedproducts; // Replace with your implementation
    };

    /**
     * Step 2: Get unique categories for dropdown
     * 
     * TODO: Extract unique category values from products
     * 
     * Approach 1 (using Set):
     * - Use .map() to extract just the category property from each product
     * - Create a Set from the array to remove duplicates
     * - Convert back to array using spread operator or Array.from()
     * 
     * Approach 2 (using filter):
     * - Use .filter() with .indexOf() to keep only first occurrence
     * 
     * Expected output: ['Electronics', 'Furniture']
     */
    const getUniqueCategories = () => {
        // TODO: Implement this function

        const categories = mockData.products.map(product => {
            return product.category
        })

        return [...new Set(categories)]; // Replace with your implementation
    };

    /**
     * Step 3: Apply filters and sorting
     * 
     * TODO: Take enriched products and apply filters + sorting
     * 
     * Steps:
     * 1. Get enriched products by calling getEnrichedProducts()
     * 2. If selectedCategory is NOT 'All Categories', filter products by category
     * 3. BONUS: If searchTerm is not empty, filter by product name
     *    Hint: Use .toLowerCase() for case-insensitive search
     *    Hint: Use .includes() to check if name contains searchTerm
     * 4. Sort the array by totalQuantity based on sortOrder state
     *    Hint: Use .sort((a, b) => ...) 
     *    Hint: For descending: b.totalQuantity - a.totalQuantity
     *    Hint: For ascending: a.totalQuantity - b.totalQuantity
     * 
     * Note: .filter() returns a new array, so you can chain them
     * Note: .sort() modifies the array in place, so call it last
     */
    const getFilteredAndSortedProducts = () => {
        // TODO: Implement this function

        return []; // Replace with your implementation
    };

    /**
     * Step 4: Calculate summary statistics
     * 
     * TODO: Calculate totals from the filtered products array
     * 
     * You need to calculate:
     * 1. totalProducts: Just the length of the products array
     * 2. totalInventory: Sum of all totalQuantity values
     *    Hint: products.reduce((sum, p) => sum + p.totalQuantity, 0)
     * 3. totalRevenue: Sum of all totalRevenue values
     *    Hint: Similar to totalInventory but use totalRevenue property
     * 
     * Return an object with these three properties
     */
    const getSummaryStats = (products) => {
        // TODO: Implement this function

        return {
            totalProducts: 0,
            totalInventory: 0,
            totalRevenue: 0
        }; // Replace with your implementation
    };

    // EVENT HANDLERS

    /**
     * TODO: Implement event handlers
     * 
     * handleCategoryChange: Update selectedCategory state with event.target.value
     * handleSortToggle: Toggle sortOrder between 'asc' and 'desc'
     * handleSearchChange: Update searchTerm state with event.target.value (BONUS)
     */
    const handleCategoryChange = (event) => {
        // TODO: Implement
    };

    const handleSortToggle = () => {
        // TODO: Implement
        // Hint: Use ternary operator to toggle: sortOrder === 'desc' ? 'asc' : 'desc'
    };

    const handleSearchChange = (event) => {
        // TODO: Implement (BONUS)
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