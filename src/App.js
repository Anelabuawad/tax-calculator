import './App.css';
import {useState} from "react";
import ItemsList from "./components/ItemsList/ItemsList";
import Receipt from "./components/Receipt/Receipt";

//mock data
const itemsData = [
    {
        "id": 1,
        "name": "Book",
        "price": 12.49,
        "isImported": false,
        "category": "books"
    },
    {
        "id": 2,
        "name": "Music CD",
        "price": 14.99,
        "isImported": false,
        "category": "entertainment"
    },
    {
        "id": 3,
        "name": "box of Chocolate",
        "price": 0.85,
        "isImported": false,
        "category": "food"
    },
    {
        "id": 4,
        "name": "box of Chocolate",
        "price": 10,
        "isImported": true,
        "category": "food"
    },
    {
        "id": 5,
        "name": "bottle of perfume",
        "price": 47.50,
        "isImported": true,
        "category": "perfume"
    },
    {
        "id": 6,
        "name": "bottle of perfume",
        "price": 18.99,
        "isImported": false,
        "category": "perfume"
    },
    {
        "id": 7,
        "name": "packet of headache pills",
        "price": 10,
        "isImported": false,
        "category": "medical"
    }
]

function App() {
    const [items, setItems] = useState(itemsData);
    const [itemsCount, setItemsCount] = useState({});
    return (
        <main>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <div className="app  mt-8  gap-y-10">
                <h1 className="head_text">Sales Tax Calculator</h1>
                <p className="text-gray-600 text-center">
                    Select items to calculate sales tax and generate a
                    receipt.<br/>
                    if it's not listed, you can add it too! </p>
                <ItemsList items={items}
                           setItems={setItems}
                           itemsCount={itemsCount}
                           setItemsCount={setItemsCount}
                />
                <Receipt items={items} itemsCount={itemsCount}/>
            </div>
        </main>
    );
}

export default App;
