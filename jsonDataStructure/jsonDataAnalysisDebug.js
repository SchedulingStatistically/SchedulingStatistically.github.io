/*

    USE FOR DEBUGGING

    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"

*/

import  {ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'

// loading a whole json to make a data struct
const whole_json = {
    name : 'whole tree',
    ownership : {
        name : 'sam',
        user_name : 'to',
        password : 'sam to'
    },
    owner_status : {
        your_global_status : 'global status 2019828',
        current_status_scope : "yearly: 2017 to 2020",
        all_event_status : [
            {an_event : 'empty', max : 0, min : 0, median : 0, mode : 0}
        ]
    },
    scheduled_events : [
        {
            year : 2019,
            month : 9,
            day : 9,
            an_event : 'coding',
            start : '9:00am',
            hours : 4,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 7,
            day : 1,
            an_event : 'typing',
            start : '11:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            an_event : 'reading',
            start : '12:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            an_event : 'reading',
            start : '4:00apm',
            hours : 5,
            end : '5:00pm'
        }
    ]
}

console.log('load whole json file')
const whole_data = JsonDataStruct.fromJsonFormat(whole_json);
console.log(whole_data);
console.log(whole_data.toJsonFormat());
whole_data.use_all_events_scheduled()
// console.log(whole_data.filter_an_event_type("reading"));

console.log('test data analysis methods')
// whole_data.use_all_events_scheduled()
// whole_data.filter_an_event_type('reading')
// whole_data.solve_min_of_all_events()
// whole_data.solve_max_of_all_events()
// whole_data.solve_median_of_all_events()
// whole_data.solve_mode_of_all_events()
whole_data.compute_an_event_type_status('reading')
console.log(whole_data.owner_status)
console.log('added scheduled event')
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 4, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 1, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 2, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 3, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 8, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 9, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 2, end : '6:00pm'})
whole_data.addScheduled_event({year : 2018, month : 1, day : 1, an_event : 'studying', start : '8:00am', hours : 3, end : '6:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 4, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 1, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 2, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 5, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 6, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 2, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'coding', start : '11:00am', hours : 3, end : '4:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'swimming', start : '4:00pm', hours : 3, end : '6:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'swimming', start : '4:00pm', hours : 1, end : '6:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'swimming', start : '4:00pm', hours : 4, end : '6:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'swimming', start : '4:00pm', hours : 1, end : '6:00pm'})
whole_data.addScheduled_event({year : 2019, month : 1, day : 1, an_event : 'swimming', start : '4:00pm', hours : 1, end : '6:00pm'})
whole_data.compute_an_event_type_status('studying')
console.log(whole_data.owner_status)
whole_data.compute_an_event_type_status('coding')
console.log(whole_data.owner_status)
whole_data.compute_an_event_type_status('swimming')
console.log(whole_data.owner_status)
