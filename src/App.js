import './App.css';
import {useState} from "react";
import ItemsList from "./components/ItemsList/ItemsList";
import Receipt from "./components/Receipt/Receipt";


const itemsData = [
    {
        "id": 1,
        "name": "Book",
        "price": 12.49,
        "isImported": false,
        "Category": "books"
    },
    {
        "id": 2,
        "name": "Music CD",
        "price": 14.99,
        "isImported": false,
        "Category": "entertainment"
    },
    {
        "id": 3,
        "name": "box of Chocolate",
        "price": 0.85,
        "isImported": false,
        "Category": "food"
    },
    {
        "id": 4,
        "name": "box of Chocolate",
        "price": 10,
        "isImported": true,
        "Category": "food"
    },
    {
        "id": 5,
        "name": "bottle of perfume",
        "price": 47.50,
        "isImported": true,
        "Category": "perfume"
    },
    {
        "id": 6,
        "name": "bottle of perfume",
        "price": 18.99,
        "isImported": false,
        "Category": "perfume"
    },
    {
        "id": 7,
        "name": "packet of headache pills",
        "price": 9.75,
        "isImported": false,
        "Category": "medical"
    }
]



function App() {
    const [items, setItems] = useState(itemsData);
    const [selectedItems, setSelectedItems] = useState([]);

    return (
        <main>
            <div className='main'>
                <div className='gradient' />
            </div>
            <div className="app  mt-8  gap-y-10">
                <h1 className="head_text">Sales Tax Calculator</h1>
                <p className="text-gray-600 ">Select items to calculate sales tax and generate a receipt.</p>
            <ItemsList items={items} setItems={setItems} setSelectedItems={setSelectedItems} selectedItems={selectedItems}/>
            <Receipt selectedItems={selectedItems}/>
            </div>
        </main>
  );
}

export default App;
