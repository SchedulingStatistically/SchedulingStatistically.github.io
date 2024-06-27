document.getElementById('input_JSON_file').addEventListener('change', function(event) {
    const file = event.target.files[0]
    if(file){
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const JSON_data = JSON.parse(e.target.result);
                document.getElementById('parse_JSON').textContent = JSON.stringify(JSON_data, null, 2);
            }catch(error){
                console.error('failed to parse json file', error);
                document.getElementById('parse_JSON').textContent = 'failed to parse json file: error' + error.message;
                }
            }
            reader.readAsText(file)
        }else{
            console.error('no file was loader!');
            console.error('must use default json!');
            useDefaultJSON();
        }
    }
)

// use the default json file for debugging
function useDefaultJSON(){
    fetch('default.json').then(response => {
        if(!response.ok){
            throw new Error('response ok error' + response.statusText);
        }
        return response.json();
    }).then(data => {console.log(data);})
    .catch(error => {console.error('fetch default JSON failed', error)})
}