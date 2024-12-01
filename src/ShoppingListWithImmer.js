import React from 'react';
import { useImmer } from "immer";

function ShoppingListWithImmer() {
    const [shoppingList, setShoppingList] = useImmer({
        id: "",
        name: "",
        quantity: "",
        details: {
            category: "",
            notes: ""
        }
    })

    const addItem = () => {

    }
    const updateItem = () => {

    }
    const removeItem = () => {

    }

    return (
        <div>ShoppingListWithImmer</div>
    )
}

export default ShoppingListWithImmer