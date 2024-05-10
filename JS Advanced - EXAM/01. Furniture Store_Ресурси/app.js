window.addEventListener('load', solve);

function solve() {
    const addButtonElement = document.getElementById('add');
    const modelInputElement = document.getElementById('model');
    const yearInputElement = document.getElementById('year');
    const descriptionInputElement = document.getElementById('description');
    const priceInputElement = document.getElementById('price');
    const furnitureListElement = document.getElementById('furniture-list');

    addButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        let model = modelInputElement.value;
        let description = descriptionInputElement.value;
        let year = Number(yearInputElement.value);
        let price = Number(priceInputElement.value);

        // non-empty string
        if (!model || !description) {
            return;
        }

        // positive numbers
        if (year <= 0 || price <= 0) {
            return;
        }

        let rowElement = document.createElement('tr');

        let modelCellElement = document.createElement('td');
        let priceCellElement = document.createElement('td');
        let actionsCellElement = document.createElement('td');

        let infoButtonElement = document.createElement('button');
        let buyButtonElement = document.createElement('button');

        let contentRowElement = document.createElement('tr');
        let yearContentElement = document.createElement('td');
        let descriptionContentElement = document.createElement('td');
        let totalPriceElement = document.querySelector('.total-price'); // returns one element


        modelCellElement.textContent = model;
        priceCellElement.textContent = price.toFixed(2);

        infoButtonElement.textContent = 'More information';
        infoButtonElement.classList.add('moreBtn');

        infoButtonElement.addEventListener('click', (e) => {
            if (e.currentTarget.textContent == 'More information') {
                contentRowElement.style.display = 'contents';
                e.currentTarget.textContent = 'Less Info';
            } else {
                contentRowElement.style.display = 'none';
                e.currentTarget.textContent = 'More information';
            }
        })

        buyButtonElement.textContent = 'Buy it';
        buyButtonElement.classList.add('buyBtn');
        buyButtonElement.addEventListener('click', (e) => {
            let currentTotalPrice = Number(totalPriceElement.textContent);
            let totalPrice = currentTotalPrice + price;
            totalPriceElement.textContent = totalPrice.toFixed(2);

            rowElement.remove();
            contentRowElement.remove();
        });

        actionsCellElement.appendChild(infoButtonElement);
        actionsCellElement.appendChild(buyButtonElement);

        rowElement.classList.add('info');

        rowElement.appendChild(modelCellElement);
        rowElement.appendChild(priceCellElement);
        rowElement.appendChild(actionsCellElement);

        yearContentElement.textContent = `Year: ${year}`;
        descriptionContentElement.setAttribute('colspan', 3);
        descriptionContentElement.textContent = `Description: ${description}`;

        contentRowElement.classList.add('hide');
        contentRowElement.style.display = 'none';

        contentRowElement.appendChild(yearContentElement);
        contentRowElement.appendChild(descriptionContentElement);

        furnitureListElement.appendChild(rowElement);
        furnitureListElement.appendChild(contentRowElement);

        modelInputElement.value = '';
        descriptionInputElement.value = '';
        yearInputElement.value = '';
        priceInputElement.value = '';
    });
}
