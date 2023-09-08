import styles from "./ItemsList.module.css"
import {useState} from "react";


export default function ItemsList({items, setSelectedItems, selectedItems, setItems}) {
    const [showAddDiv, setShowAddDiv] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        category: '',
        isImported: false,
    });
    const handleInputChange = (e) => {
        const {id, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        console.log(newValue)
        setFormValues((prevState) => {
            return {...prevState, [id]: newValue}
        });
        console.log(formValues);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: items.length + 1,
            name: formValues.name,
            price: parseFloat(formValues.price),
            category: formValues.category,
            isImported: formValues.isImported,
        };
        setItems([...items, newItem]);

        setFormValues({
            name: '',
            price: '',
            category: '',
            isImported: false,
        });
        setShowAddDiv(false)
    };

    function onAddItem() {
        setShowAddDiv((prevShowAddDiv) => !prevShowAddDiv)
    }

    function handleItemSelect(index) {
        if (selectedItems.includes(items[index])) {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item !== items[index])
            );
        } else
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, items[index]]);
    }

    return (
        <>
            <button className={styles.btnAdd} onClick={onAddItem}>Add new Item</button>
            {showAddDiv &&
                <div className={"border-2 shadow-lg w-full"}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'grid gap-6 mb-6 md:grid-cols-2 m-8 '}>
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Product name </label>
                                <input type="text" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                       placeholder="chocolate bar"
                                       onChange={(e) => handleInputChange(e)}
                                       value={formValues.name}
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="price"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price
                                </label>
                                <input type="number" id="price"
                                       onChange={(e) => handleInputChange(e)}
                                       value={formValues.price}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                       placeholder="50"

                                       required/>
                            </div>
                            <div>
                                <label htmlFor="category"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <input type="text" id="category"
                                       onChange={(e) => handleInputChange(e)}
                                       value={formValues.category}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                       placeholder="food" required/>
                            </div>
                            <div className="flex items-start mb-6 my-auto">
                                <div className="flex items-center h-5">
                                    <input id="isImported" type="checkbox"
                                           onChange={(e) => handleInputChange(e)}
                                           checked={formValues.isImported}
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <label htmlFor="isImported"
                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Imported
                                    Item <span
                                        className={'text-gray-400'}>(check if the item is imported)</span></label>
                            </div>
                        </div>
                        <div className="flex justify-center mb-6 ">
                            <button type="submit"
                                    className={`${styles.submitBtn} bg-red-50 w-1/2`}>
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            }
            <div className="flex flex-col gap-5 w-full">
                {items.map((item, index) => (
                    <div key={index} onClick={() => handleItemSelect(index)}
                         className={`${selectedItems.includes(items[index]) ? 'border-2 border-green-300' : ''}
                "shadow-lg content-center gap-2 bg-blue-500 bg-opacity-5 flex flex-row  "`}>
                        <button className={'ml-5 font-bold text-red-500 text-2xl'}>-</button>
                        <div
                            className={
                                " px-6 py-4 w-full flex justify-center flex-row gap-5"}>
                            <div className="flex flex-row gap-2 font-bold  m-5">
                                <p> {item.name}
                                    - ${item.price.toFixed(2)}
                                    {item.isImported &&
                                        <span className={'text-gray-400 text-sm'}> (imported goods)</span>}
                                </p>
                                <p className={'font-light'}>x 5</p>
                            </div>
                        </div>
                        <button className={"mr-5 justify-end font-bold text-green-500 text-2xl"}>+</button>
                    </div>
                ))}
            </div>
        </>
    );
}