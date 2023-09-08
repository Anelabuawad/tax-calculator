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
                         ${styles.cardDiv} `}>
                        <button onClick={() => handleDecCount(item.id)}
                                className={styles.decBtn}> -
                        </button>
                        <div className={styles.contentDiv}>
                            <div className="flex flex-row gap-2 font-bold m-5">
                                <p> {item.name}
                                    - ${item.price.toFixed(2)}
                                    {item.isImported &&
                                        <span className={'text-gray-400 text-sm'}> (imported goods)</span>}
                                </p>
                                {itemsCount[item.id]>0 && <p className={'font-light'}>x {itemsCount[item.id]}</p>}
                            </div>
                        </div>
                        <button className={styles.incBtn}
                                onClick={() => handleIncCount(item.id)}>+
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}