/*Exercise: Product Card Grid
Build three components: ProductPage → ProductList → ProductCard.
ProductPage (grandparent):

Has useState for a cart count (number)
Has useState for a sort order ("price" or "name")
Passes sort, cart count, and an addToCart callback down

ProductList (middle):

Receives products + sort order as props
Sorts products before rendering
Maps over them rendering ProductCard components

ProductCard (child):

Receives name, price, inStock (bool), and onAdd callback
Shows name and price
If inStock, show a green "Add to Cart" button that calls onAdd
If not, show a grayed-out "Out of Stock" label instead
*/

import { useState } from "react";



const products = [
    { id: 1, name: 'Keyboard', price: 75, inStock: true },
    { id: 2, name: 'Mouse', price: 25, inStock: true },
    { id: 3, name: 'Monitor', price: 300, inStock: false },
    { id: 4, name: 'Headset', price: 50, inStock: true },
];

function ProductCard({ name, price, inStock, onAdd, product }) {
    // render card with conditional button

    return (

        <div style={{ border: '.1px solid #b48c8c', borderRadius: '5px', padding: 10, margin: 10 }}>

            <p>{product.name}</p>
            <p>{product.price}</p>
            <div>{inStock ? <button onClick={() => { onAdd(product) }}> Add to cart</button> : <p>out of stock</p>}</div>
        </div>
    )
}

function ProductList({ products, sortBy, onAdd }) {
    // sort products, then map → <ProductCard />
    //console.log(sortBy)
    //console.log(products)
    //avoid mutating
    let sorted = [...products].sort((a, b) => {

        if (sortBy === "price")

            return a[sortBy] - b[sortBy]

        else

            return a[sortBy].localeCompare(a[sortBy])

    })
    // console.log(sorted)

    return (
        <div style={{ maxWidth: "400px", display: "grid", alignItems: "center", margin: '0 auto' }}>
            {
                sorted.map((product => {

                    return <ProductCard onAdd={onAdd} key={product.id} name={product.name} price={product.price} inStock={product.inStock} product={product} />


                }))
            }
        </div>
    )
}

export default function ProductPage() {
    const [cartCount, setCartCount] = useState(0);
    const [sortBy, setSortBy] = useState('price');

    function handleSort() {


        setSortBy(sortBy == "price" ? "name" : "price")
    }

    function handleAddtoCart(product) {

        setCartCount(cartCount + 1)
        console.log(product.name)
        console.log("1add to cart")
    }

    return (
        <>
            <button onClick={handleSort}> SORT {sortBy}</button>

            <p>  Cart Count {cartCount} </p>


            <ProductList products={products} sortBy={sortBy} onAdd={handleAddtoCart} />
        </>
        // sort toggle, cart count display, <ProductList />
    );
}