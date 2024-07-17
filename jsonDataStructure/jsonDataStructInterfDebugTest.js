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
console.log(our_interface.accessor_object_json_format())

// update ownership on interface
console.log('update ownership on interface')
our_interface.updateOwnership('maz', 'will', 'maz will')
console.log(our_interface.accessor_object_json_format())

// add a scheduled event
console.log('add a scheduled event')
our_interface.addComplete_event('work', 2022, 10, 3, 'web development', '1:00pm', 3, '4:00pm')
console.log(our_interface.accessor_object_json_format())

// remove a schedule event in filo queue
console.log('remove a schedule event in filo queue')
our_interface.remove_top_Completed_event()
console.log(our_interface.accessor_object_json_format())

// remove a schedule event in lilo queue
// console.log('remove a schedule event in lilo queue')
// our_interface.remove_bottom_Completed_event()
// console.log(our_interface.accessor_object_json_format())

// console.log('schedule a set of events')
// our_interface.addComplete_event('work', 2019, 11, 21, 'history', '8:00am', 2, '11:30am')
// our_interface.addComplete_event('work', 2019, 11, 22, 'history', '8:00am', 1, '11:30am')
// our_interface.addComplete_event('work', 2019, 11, 23, 'history', '8:00am', 3, '11:30am')
// our_interface.addComplete_event('work', 2019, 11, 24, 'history', '8:00am', 4, '11:30am')
// our_interface.addComplete_event('work', 2019, 11, 25, 'history', '8:00am', 4, '11:30am')

// our_interface.addComplete_event('work', 2020, 1, 21, 'comps', '8:00am', 10, '1:30am')
// our_interface.addComplete_event('work', 2020, 1, 22, 'comps', '8:00am', 2, '11:30am')
// our_interface.addComplete_event('work', 2020, 1, 23, 'comps', '8:00am', 10, '11:30am')
// our_interface.addComplete_event('work', 2020, 1, 24, 'comps', '8:00am', 9, '11:30am')
// our_interface.addComplete_event('work', 2020, 1, 25, 'comps', '8:00am', 12, '11:30am')

our_interface.addComplete_event('work', 2020, 11, 21, 'calc', '8:00am', 5, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 22, 'calc', '8:00am', 2, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 23, 'calc', '8:00am', 8, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 24, 'calc', '8:00am', 9, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 25, 'calc', '8:00am', 4, '11:30am')

our_interface.addComplete_event('work', 2020, 11, 21, 'art', '8:00am', 5, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 22, 'art', '8:00am', 2, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 23, 'art', '8:00am', 8, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 24, 'art', '8:00am', 9, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 25, 'art', '8:00am', 4, '11:30am')

our_interface.addComplete_event('work', 2020, 11, 21, 'hims', '8:00am', 5, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 22, 'hims', '8:00am', 0, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 23, 'hims', '8:00am', 8, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 24, 'hims', '8:00am', 0, '11:30am')
our_interface.addComplete_event('work', 2020, 11, 25, 'hims', '8:00am', 4, '11:30am')

console.log(our_interface.accessor_object_json_format())

// console.log('partition a set of event')
// console.log('yearly partition')
// our_interface.get_events_within_a_yearly_time_partition('work', 2019, 2020)
// console.log(our_interface.accessor_object_filter_events())
// console.log('monthly partition')
// our_interface.get_events_within_a_monthly_time_partition('work', 2020, 1, 11)
// console.log(our_interface.accessor_object_filter_events())
console.log('daily time partition')
our_interface.get_events_within_a_daily_time_partition('work', 2020, 11, 22, 25)
console.log(our_interface.accessor_object_filter_events())


console.log('test json data struct event update')
our_interface.update_the_complete_event('work', 2020, 11, 22, 'update', '1:00pm', 4, '3:00pm', true, 22112020)
our_interface.update_the_complete_event('work', 2020, 11, 22, 'updat1', '1:00pm', 4, '3:00pm', true, 122112020)
our_interface.update_the_complete_event('work', 2020, 11, 22, 'updat2', '1:00pm', 4, '3:00pm', true, 222112020)
our_interface.delete_the_complete_event('work', 2020, 11, 25, 'delete', '10:00pm', 1, '5:00am', false, 225112020)
console.log(our_interface.accessor_object_json_format())

console.log('daily time partition')
our_interface.get_events_within_a_daily_time_partition('work', 2020, 11, 22, 25)
console.log(our_interface.accessor_object_filter_events())




// console.log('compute filter events')
// our_interface.compute_an_event_status('calc')
// console.log(our_interface.accessor_object_event_status())

// console.log('compute a list of filter evens')
// our_interface.add_an_event_type('calc')
// our_interface.add_an_event_type('hims')
// our_interface.compute_all_event_status_type()
// console.log(our_interface.accessor_object_event_status())

// console.log('test task adding')
// our_interface.addComplete_event('task', 2022, 11, 21, 'baseball', '8:00am', 2, '11:30am')
// our_interface.addComplete_event('task', 2022, 11, 21, 'baseball', '8:00am', 2, '11:30am')
// our_interface.get_events_within_a_yearly_time_partition('task', 2022, 2022)
// console.log(our_interface.accessor_object_filter_events())

// // get json object string
// console.log('get json object string')
// console.log(our_interface.getJsonObjectString());

// // get json object an_event
// console.log('get json an_event status')
// console.log(our_interface.getEventStatus())