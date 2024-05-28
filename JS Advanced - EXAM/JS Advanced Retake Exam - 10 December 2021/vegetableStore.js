class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables(vegetables) {
        vegetables.forEach(product => {
            let [type, quantity, price] = product.split(' ');
            quantity = Number(quantity);
            price = Number(price);
            let currentProduct = this.availableProducts.find(p => p.type === type);

            if (!currentProduct) {
                this.availableProducts.push({
                    type,
                    quantity,
                    price
                });
            } else {
                currentProduct.quantity += quantity;
                if (currentProduct.price < price) {
                    currentProduct.price = price;
                }
            }
        });
        let buff = [];
        this.availableProducts.forEach(product => buff.push(product.type));
        return `Successfully added ${buff.join(', ')}`;
    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0;
        selectedProducts.forEach(data => {
            let [type, quantity] = data.split(' ');
            quantity = Number(quantity); // Convert quantity to a number
            let currentProduct = this.availableProducts.find(x => x.type === type);
            if (!currentProduct) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }

            if (quantity > currentProduct.quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }

            totalPrice += quantity * currentProduct.price;
            currentProduct.quantity -= quantity;
        });
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }

    rottingVegetable(type, quantity) {
        let currentProduct = this.availableProducts.find(x => x.type === type);
        if (!currentProduct) {
            throw new Error(`${type} is not available in the store.`);
        }

        currentProduct.quantity -= quantity;
        if (currentProduct.quantity <= 0) {
            currentProduct.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        }
        return `Some quantity of the ${type} has been removed.`;
    }

    revision() {
        let buff = `Available vegetables:\n`;
        this.availableProducts
            .sort((a, b) => a.price - b.price)
            .forEach(p => buff += `${p.type}-${p.quantity}-$${p.price}\n`);
        buff += `The owner of the store is ${this.owner}, and the location is ${this.location}.`;
        return buff;
    }
}


// let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta,Sofia");

// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8",

// "Celery 5.5 2.2", "Celery 0.5 2.5"]));

// let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta,Sofia");

// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8",

// "Celery 5.5 2.2", "Celery 0.5 2.5"]));

// console.log(vegStore.buyingVegetables(["Okra 1"]));

// console.log(vegStore.buyingVegetables(["Beans 8", "Okra 1.5"]));

// console.log(vegStore.buyingVegetables(["Banana 1", "Beans 2"]));


// let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta,Sofia");

// console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8",

// "Celery 5.5 2.2", "Celery 0.5 2.5"]));

// console.log(vegStore.rottingVegetable("Okra", 1));

// console.log(vegStore.rottingVegetable("Okra", 2.5));

// console.log(vegStore.buyingVegetables(["Beans 8", "Okra 1.5"]));

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta,Sofia");

console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8",

    "Celery 5.5 2.2", "Celery 0.5 2.5"]));

console.log(vegStore.rottingVegetable("Okra", 1));

console.log(vegStore.rottingVegetable("Okra", 2.5));

console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));

console.log(vegStore.revision());
