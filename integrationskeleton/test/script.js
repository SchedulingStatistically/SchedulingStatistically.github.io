const form = document.getElementById('form');
const textInput = document.getElementById('text-input');
const submitBtn = document.getElementById('submit-btn');
const inputList = document.getElementById('input-list');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = textInput.value.trim();
    if (userInput != '') {
        const id = Math.floor(Math.random() * 1000000);
        const record = {
            'fields': {
                'id': id.toString(),
                'Name': userInput
            }
        };
        
        console.log(record);
        // Send data to Airtable
        fetch(`https://api.airtable.com/v0/appjMFSP6U6V4cwTO/Tasks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [record],
                typecast: true
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Append input data to the list
            const listItem = document.createElement('li');
            listItem.textContent = userInput;
            inputList.appendChild(listItem);
            textInput.value = '';
        })
        .catch((error) => console.error('Error:', error));
    }
});