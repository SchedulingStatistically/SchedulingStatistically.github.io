/*

    USE FOR DEBUGGING

    HOW TO TEST THE CODE

    "Use and the jsonDataStructInterf.js to run and test the JsonDataStructInterf object"
    "run JsonDataStructInterf.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"

    UNLESS the change you have made in jsonDataStructInter.js has been approve
    show how the changes you have made works below DOCUMENT THE CHANGES PROPERLY.

*/

import jsonDataStructInterf from "./jsonDataStructInterf.js";

console.log('debugging jsonDataStructInterf');
const our_interface = new jsonDataStructInterf('face');
our_interface.use_default_json_data()
console.log('print initialize interface object')
console.log(our_interface)

// update ownership on interface
console.log('update ownership on interface')
our_interface.updateOwnership('jen', 'will', 'jen will')
console.log(our_interface)

// add a scheduled event
console.log('add a scheduled event')
our_interface.addComplete_events(2022, 10, 3, 'web development', '1:00pm', 3, '4:00pm')
console.log(our_interface)

// remove a schedule event in lilo queue
console.log('remove a schedule event in lilo queue')
our_interface.removeCompleted_event()
console.log(our_interface)

// get json object string
console.log('get json object string')
console.log(our_interface.getJsonObjectString());

// get json object an_event
console.log('get json an_event status')
console.log(our_interface.getEventStatus())