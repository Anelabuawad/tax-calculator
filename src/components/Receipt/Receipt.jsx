import styles from "./Receipt.module.css"

export default function Receipt({items, itemsCount}) {
    const ItemsKeys = Object.keys(itemsCount);
    let selectedItems = [];
    ItemsKeys.forEach((id) => {
        const item = items.find((item) => item.id === parseFloat(id));
        if (item) {
            item['qty'] = itemsCount[id];
            if (item.qty === 0) {
                const indexToRemove = selectedItems.indexOf(item);
                if (indexToRemove !== -1) {
                    selectedItems.splice(indexToRemove, 1);
                }
            } else {
                selectedItems.push(item);
            }
        }
    });
    const calculateSalesTax = (item) => {
        const basicTaxRate = 10; // 10%
        const importTaxRate = 5; // 5%
        const roundingFactor = 0.05; // Rounding to the nearest 0.05
        let salesTax = 0;

        const isExempt = item.category === 'books' || item.category === 'food' || item.category === 'medical';

        if (!isExempt) {
            salesTax += (basicTaxRate * (item.qty * item.price)) / 100;
        }

        if (item.isImported) {
            salesTax += (importTaxRate * (item.qty * item.price)) / 100;
        }

        salesTax = Math.ceil(salesTax / roundingFactor) * roundingFactor;
        return salesTax
    };

    const totalPrice = selectedItems.reduce((total, item) => total + (item.price * item.qty), 0);
    let totalSalesTax = 0;

    return (
        <div className={styles.mainDiv}>
            <h2>Receipt</h2>
            <hr/>
            <ul>
                {selectedItems.map((item, index) => {
                    const salesTax = calculateSalesTax(item);
                    totalSalesTax += salesTax;
                    const itemPriceWithTax = (item.price + salesTax);
                    return (
                        <li key={index} className={"my-2"}>
                            {item.qty} <span> x </span>
                            {item.name} -
                            ${itemPriceWithTax.toFixed(2)}
                            <span className={'text-gray-400 font-light'}>(Sales Tax: ${(salesTax).toFixed(2)}) </span>
                        </li>
                    );
                })}
            </ul>
            <div className="font-bold mt-2">Total Sales Taxes: ${(totalSalesTax).toFixed(2)}</div>
            <div className="font-bold mt-2">Total: ${(totalPrice + totalSalesTax).toFixed(2)}</div>
        </div>

    );
}