fetch('default.json').then(response => {
    if(!response.ok){
        throw new Error('response ok error' + response.statusText);
    }
    return response.json();
}).then(data => {console.log(data);})
.catch(error => {console.error('fetch default JSON failed', error)})