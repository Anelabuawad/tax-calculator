import styles from "./ItemsList.module.css"
import { useState} from "react";
import Form from "../Form/Form";


export default function ItemsList({items, setItems, setItemsCount, itemsCount}) {
    const [showAddDiv, setShowAddDiv] = useState(false);

    function handleIncCount(id) {
        setItemsCount((prevItemsCount) => {
            const updatedItemsCount = {...prevItemsCount};

            if (updatedItemsCount.hasOwnProperty(id)) {
                updatedItemsCount[id]++;
            } else {
                // If the item doesn't exist, add it with a count of 1
                updatedItemsCount[id] = 1;
            }
            return updatedItemsCount;
        });


    }

    function handleDecCount(id) {
        setItemsCount((prevItemsCount) => {
            const updatedItemsCount = {...prevItemsCount};
            if (updatedItemsCount.hasOwnProperty(id)) {
                updatedItemsCount[id]--;
            }
            return updatedItemsCount;
        });
    }

    function onAddItem() {
        setShowAddDiv((prevShowAddDiv) => !prevShowAddDiv)
    }

    return (
        <>
            <button className={styles.btnAdd} onClick={onAddItem}>Add new Item</button>
            {showAddDiv &&
                <Form items={items} setItems={setItems} setShowAddDiv={setShowAddDiv}/>
            }
            <div className="flex flex-col gap-5 w-full">
                {items.map((item, index) => (
                    <div key={index}
                         className={`${itemsCount[item.id] ? 'border-2 border-green-300' : ''} 
                         shadow-lg content-center gap-2 bg-blue-500 bg-opacity-5 flex flex-row `}>
                        <button onClick={() => handleDecCount(item.id)}
                                className={'ml-5 font-bold text-red-500 text-2xl'}>-
                        </button>
                        <div
                            className={
                                " px-6 py-4 w-full flex justify-center flex-row gap-5"}>
                            <div className="flex flex-row gap-2 font-bold  m-5">
                                <p> {item.name}
                                    - ${item.price.toFixed(2)}
                                    {item.isImported &&
                                        <span className={'text-gray-400 text-sm'}> (imported goods)</span>}
                                </p>
                                {itemsCount[item.id]>0 && <p className={'font-light'}>x {itemsCount[item.id]}</p>}
                            </div>
                        </div>
                        <button className={"mr-5 justify-end font-bold text-green-500 text-2xl"}
                                onClick={() => handleIncCount(item.id)}>+
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}