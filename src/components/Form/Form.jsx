import styles from "./Form.module.css"
import {useState} from "react";

export default function Form({items, setItems, setShowAddDiv}) {
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
    return (
        <div className={"border-2 shadow-lg w-full"}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={'grid gap-6 mb-6 md:grid-cols-2 m-8 '}>
                    <div>
                        <label htmlFor="name"
                               className={styles.inputLabel}>
                            Product name </label>
                        <input type="text" id="name"
                               className={styles.inputField}
                               placeholder="chocolate bar"
                               onChange={(e) => handleInputChange(e)}
                               value={formValues.name}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="price"
                               className={styles.inputLabel}>
                            Price
                        </label>
                        <input type="number" id="price"
                               onChange={(e) => handleInputChange(e)}
                               value={formValues.price}
                               className={styles.inputField}
                               placeholder="50"

                               required/>
                    </div>
                    <div>
                        <label htmlFor="category"
                               className={styles.inputLabel}>Category</label>
                        <input type="text" id="category"
                               onChange={(e) => handleInputChange(e)}
                               value={formValues.category}
                               className={styles.inputField}
                               placeholder="food" required/>
                    </div>
                    <div className="flex items-start mb-6 my-auto">
                        <div className="flex items-center h-5">
                            <input id="isImported" type="checkbox"
                                   onChange={(e) => handleInputChange(e)}
                                   checked={formValues.isImported}
                                   className={styles.inputField}

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
    )
}