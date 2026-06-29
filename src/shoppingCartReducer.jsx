/*Exercise: Shopping Cart with useReducer
Build a ShoppingCart component where all state changes go through a reducer.
Actions:

ADD_ITEM — adds item (or increments quantity if already in cart)
REMOVE_ITEM — removes item entirely
UPDATE_QUANTITY — sets quantity for an item
CLEAR_CART — empties the cart

Components:

Cart — displays cart items, total price, and clear button
ProductShelf — list of available products with "Add to Cart" buttons*/

import { useReducer } from "react";

const availableProducts = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 449 },
    { id: 4, name: 'Watch', price: 299 },
];

const initialState = { items: [] };

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            // if exists, increment qty — otherwise add with qty: 1
            let indexx = state.items.findIndex((item) => item.id === action.payload.id)

            if (indexx !== -1) {
                console.log("already in cart")

                let newitems = state.items.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)

                return { items: newitems }

            } else {
                console.log("new product to cart")

                return { items: [...state.items, { ...action.payload, quantity: 1 }] }
            }

        //should  be to handle other properties of state object:
        //          return { 
        //     ...state, 
        //     items: [...state.items, action.payload.product] 
        //   };
        case 'REMOVE_ITEM':

            console.log(state.items)
            //  return { ...state, items: [state.items.filter((item) => item.id !== action.payload.id)] }
            return { items: state.items.filter((item) => item.id !== action.payload) }

        // filter out by id
        case 'UPDATE_QUANTITY':

            let newitem

            return {
                items: state.items.map((item) =>
                    item.id === action.payload.product.id ?
                        newitem = { ...item, quantity: item.quantity + (action.payload.symbol === "+" ? 1 : -1) }
                        : item

                ).filter((item) => item.quantity != 0)
            }
        // map and update qty for matching id
        // if qty <= 0, remove it
        case 'CLEAR_CART':

            return initialState
        // return initial state
        default:
            return state;
    }
}

function ProductShelf({ dispatch }) {
    // map availableProducts, button dispatches ADD_ITEM
    return (
        <ul>
            {
                availableProducts.map((product) => {

                    return <li key={product.id}><div>
                        {product.name} {product.price}
                    </div>
                        <button onClick={() => { dispatch({ type: "ADD_ITEM", payload: product }) }} >ADD ITEM</button>
                    </li>

                })
            }
        </ul>
    )
}
//  {product.name} {product.price}
function Cart({ state, dispatch }) {

    // console.log(state)
    //console.log(state.items)
    return (
        <>
            <h1>Cart</h1>
            <ul>
                {
                    state.items.map((product) => {


                        return (<li key={product.id}><div>
                            <p>{product.quantity}</p>  {product.name} {product.price}
                        </div>
                            <button onClick={() => { dispatch({ type: "UPDATE_QUANTITY", payload: { product, symbol: "+" } }) }} >+</button>
                            <button onClick={() => { dispatch({ type: "UPDATE_QUANTITY", payload: { product, symbol: "-" } }) }} >-</button>
                            <button onClick={() => { dispatch({ type: "REMOVE_ITEM", payload: product.id }) }} >REMOVE</button>
                        </li>
                        )

                    })
                }
            </ul>
            <button onClick={() => { dispatch({ type: "CLEAR_CART" }) }}>EMPTY Cart</button>
        </>
    )
    // show items with qty, +/- buttons, remove, total, clear
}

export default function ShoppingCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <div>
            <ProductShelf dispatch={dispatch} />
            <Cart state={state} dispatch={dispatch} />
        </div>
    );
}