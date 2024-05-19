function solve() {
    const nameInput = document.getElementById('recipientName');
    const titleInput = document.getElementById('title');
    const messageInput = document.getElementById('message');
    const list = document.getElementById('list');
    const deletedList = document.querySelector('.delete-list');
    const sentList = document.querySelector('.sent-list');


    document.getElementById('add').addEventListener('click', createMail);
    document.getElementById('reset').addEventListener('click', onReset);

    // 1. Create mail process
    // add listener to Create button
    // read input fields
    // validate all fields are entered
    // create mail element from input
    // addEvenetListener to Send button
    // addEvenetListener to Delete button
    // clear input fields
    // add element to DOM

    function createMail(e) {
        e.preventDefault();
        const name = nameInput.value;
        const title = titleInput.value;
        const message = messageInput.value;

        if (name == '' || title == '' || message == '') {
            return;
        }

        const liElement = document.createElement('li');
        liElement.innerHTML = `
            <h4>Title: ${title}</h4>
            <h4>Recipient Name:  ${name}</h4>
            <span> ${message}</span>
            <div id="list-action">
                <button type="submit" id="send">Send</button>
                <button type="submit" id="delete">Delete</button>
            </div>
        `;

        liElement.querySelector('#delete').addEventListener('click', deleteMail);
        liElement.querySelector('#send').addEventListener('click', sendMail);

        list.appendChild(liElement);
        resetInput();

        // 2. Send mail process
        // read data from closure
        // create sedn mail element
        // addEvenetListener to Delete button
        // add element to DOM
        // remove from element from DOM

        function sendMail(e) {
            const sentMailElement = document.createElement('li');
            sentMailElement.innerHTML = `
            <span>To: John@abv.bg</span>
            <span>Title: For Work</span>
            <div class="btn">
                <button type="submit" class="delete">Delete</button>
            </div>
            `;

            sentMailElement.querySelector('.delete').addEventListener('click', () => {
                const deletedMailElement = document.createElement('li');
                deletedMailElement.innerHTML = `
                <span>To:${name}</span>
                <span>Title: ${title}</span>
                `;

                deletedList.appendChild(deletedMailElement);
                sentMailElement.remove();
            });

            sentList.appendChild(sentMailElement);
            liElement.remove();
        }

        // 3. Delete mail process
        // read data from closure
        // create deleted mail element
        // remove from element from DOM

        function deleteMail() {
            const deletedMailElement = document.createElement('li');
            deletedMailElement.innerHTML = `
            <span>To:${name}</span>
            <span>Title: ${title}</span>
            `;

            deletedList.appendChild(deletedMailElement);
            liElement.remove();
        }
    }
    // 4. Reset process
    // add listener to Reset button
    // clear input fields

    function onReset(e) {
        e.preventDefault();
        resetInput();
    }

    function resetInput() {
        nameInput.value = '';
        titleInput.value = '';
        messageInput.value = '';
    }
}
solve()