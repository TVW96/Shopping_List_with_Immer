import { React, useState } from 'react';
import { useImmer } from "use-immer";
import "./styles.sass";
import ItemsList from "./ItemsList";

function ShoppingListWithImmer() {
    const [shoppingList, setShoppingList] = useImmer([{
        id: 0,
        name: "",
        quantity: 0,
        details: {
            category: "",
            notes: ""
        },
        url: ""
    }])

    const addItem = (item) => {
        setShoppingList((draft) => {
            const existingItem = draft.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                draft.push({
                    ...item,
                    quantity: 1,
                    url: item.images[0]?.url || ""
                });
            }
        });
    };

    const updateItem = (id, action) => {
        setShoppingList((draft) => {
            const item = draft.find((cartItem) => cartItem.id === id);
            if (item) {
                if (action === 'increment') {
                    item.quantity += 1; // Increment quantity
                } else if (action === 'decrement' && item.quantity > 0) {
                    item.quantity -= 1; // Decrement quantity, ensuring it doesn't go below 0
                }
            }
        });
    };

    const removeItem = (id) => {
        setShoppingList((draft) => {
            return draft.filter((item) => item.id !== id);
        });
    };


    const [curr, setCurr] = useState(0);

    const prev = (item, id) => {
        setCurr((prevCurr) => {
            const newCurr = { ...prevCurr };
            if (item.id === id) {
                const currentIndex = newCurr[id] || 0;
                newCurr[id] = (currentIndex === 0 ? item.images.length - 1 : currentIndex - 1);
                console.log("New curr:", newCurr); // Debugging the updated curr
            }
            return newCurr;
        });
    };

    const next = (item, id) => {
        // Check if the item has an entry in the curr object
        setCurr((prevCurr) => {
            const newCurr = { ...prevCurr };
            if (item.id === id) {
                const currentIndex = newCurr[id] || 0; // Default to 0 if no value found for this item
                newCurr[id] = (currentIndex === item.images.length - 1 ? 0 : currentIndex + 1);
                console.log("New curr:", newCurr); // Debugging the updated curr
            }
            return newCurr;
        });
    };

    return (
        <div className='layout'>
            <p>layout</p>
            {/* // Shopping Cart */}
            <div className='section'>
                <p>section</p>
                <div className='shoppingCart'>
                    <h2>Shopping Cart</h2>
                    <h3>cart</h3>
                    <ul className='shoppingCart_items'>
                        <p>shoppingCart_items</p>
                        {shoppingList.map((draft) => (
                            (draft.name && draft.details.category && draft.url && draft.details.notes && draft.quantity > 0) ? (
                                <div key={draft.id} className='item'>
                                    <p>item</p>
                                    <strong>{draft.name}</strong>
                                    <img src={draft.url} width={100} />
                                    <div className='details'>
                                        <p>Quantity:{draft.quantity}</p>
                                        <button id='removeItem' onClick={() => removeItem(draft.id)
                                        }>
                                            remove
                                        </button>
                                        <div className='updateItem'>
                                            <button onClick={() => updateItem(draft.id, 'decrement')}>-</button>
                                            <button onClick={() => updateItem(draft.id, 'increment')}>+</button>
                                        </div>

                                    </div>
                                </div>
                            ) : null
                        ))}
                    </ul>
                </div>

            </div>


            <div className='section'>
                <p>section</p>
                {/* Item list */}
                <h2>itemList</h2>
                <ul className='itemList'>
                    {ItemsList.map((item, index) => (
                        <div className='item_container'>
                            <p>item_container</p>
                            <strong>{item.name}</strong>
                            <div key={item.id} className='item'>
                                <div className='slideshow_navigation'>
                                    <button onClick={() => prev(
                                        item,
                                        item.id
                                    )}>
                                        <h1>&lt;</h1>
                                    </button>
                                </div>
                                <div className='slideshow'>
                                    <div className='slideshow_slide' style={{ transform: `translateX(-${(curr[item.id] || 0) * 100}%)` }}>
                                        {/* Image slides */}
                                        {item.images.map((image, index) => (
                                            <img src={image.url} alt='Item' className='slideshow_image'
                                                key={index} />
                                        ))}
                                    </div>
                                </div>
                                <div className='slideshow_navigation'>
                                    <button onClick={() => next(
                                        item,
                                        item.id
                                    )}>
                                        <h1>&gt;</h1>
                                    </button>
                                </div>
                            </div>
                            <button id='item' onClick={() => addItem(item)}>
                                Add to Cart
                            </button>
                        </div>
                    ))
                    }
                </ul >
            </div >
        </div >
    )
}

export default ShoppingListWithImmer