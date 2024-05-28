window.addEventListener('load', solve);

function solve() {
    document.querySelector("button[type = 'submit']").addEventListener('click', createTask);

    const typeProduct = document.getElementById('type-product');
    const description = document.getElementById('description');
    const clientName = document.getElementById('client-name');
    const clientPhone = document.getElementById('client-phone');

    const receiveSection = document.getElementById('received-orders');
    const finishSection = document.getElementById('completed-orders');
    const clearBtn = finishSection.querySelector('button');
    clearBtn.addEventListener('click', clearTask);

    function createTask(e) {
        e.preventDefault();

        const typeValue = typeProduct.value;
        const descriptionValue = description.value;
        const nameValue = clientName.value;
        const phoneValue = clientPhone.value;

        if (!descriptionValue || !nameValue || !phoneValue) {
            return;
        }

        description.value = '';
        clientName.value = '';
        clientPhone.value = '';

        createOrder(typeValue, descriptionValue, nameValue, phoneValue);
    }

    function createOrder(typeValue, descriptionValue, nameValue, phoneValue) {
        const divElement = document.createElement('div');
        divElement.classList.add('container');

        const h2 = document.createElement('h2');
        h2.textContent = `Product type for repair: ${typeValue}`;

        const h3 = document.createElement('h3');
        h3.textContent = `Client information: ${nameValue}, ${phoneValue}`;

        const h4 = document.createElement('h4');
        h4.textContent = `Description of the problem: ${descriptionValue}`;

        const startBtn = document.createElement('button');
        startBtn.classList.add('start-btn');
        startBtn.textContent = 'Start repair';

        startBtn.addEventListener('click', startRepair);

        const finishBtn = document.createElement('button');
        finishBtn.classList.add('finish-btn');
        finishBtn.setAttribute('disabled', true);
        finishBtn.textContent = 'Finish repair';
        finishBtn.addEventListener('click', finishTask);

        divElement.appendChild(h2);
        divElement.appendChild(h3);
        divElement.appendChild(h4);
        divElement.appendChild(startBtn);
        divElement.appendChild(finishBtn);

        receiveSection.appendChild(divElement);
    }

    function startRepair(e) {
        e.target.setAttribute('disabled', true);
        const finishBtn = e.target.parentElement.getElementsByClassName('finish-btn')[0];
        finishBtn.disabled = false;
    }

    function finishTask(e) {
        const divElement = e.target.parentElement; 
        finishSection.appendChild(divElement);

        const buttons = divElement.querySelectorAll('button');
        buttons[0].remove();
        buttons[1].remove();
    }

    function clearTask() {
        const containers = finishSection.querySelectorAll('.container');
        Array.from(containers).forEach(c => c.remove());
    }
}
