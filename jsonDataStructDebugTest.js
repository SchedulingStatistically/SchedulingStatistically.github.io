/*

    USE FOR DEBUGGING

    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"

*/

import  {ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'

// Ownership data

const owner = new Ownership('jeff', 'jet', 'jeff jet');
console.log('ownership data');
console.log(owner);
console.log(owner.toJsonFormat());

const owner_json = {
    name : 'john',
    user_name : 'jobs',
    password : 'john jobs'
}
console.log('after updating Ownership');
const new_owner = Ownership.fromJsonFormat(owner_json);
console.log(new_owner);
console.log(new_owner.toJsonFormat());

// Owner status data
const status_json = {
    max : 29,
    min : 1,
    mode : 7,
    median : 13
}
console.log('owner status data');
const status = OwnerStatus.fromJsonFormat(status_json);
console.log(status);
console.log(status.toJsonFormat());

// Scheduled event data
const event_0_json = {
    year : 1997,
    month : 12,
    day : 11,
    hobby : 'coding',
    start : '10:00pm',
    hours : 3,
    end : '3:00pm'
}
console.log('Scheduled event data, event_0');
const event_0 = ScheduledEvents.fromJsonFormat(event_0_json);
console.log(event_0);
console.log(event_0.toJsonFormat())

// jsonDataStruct data
console.log('json data struct')
const data = new JsonDataStruct('tree', owner, status, [event_0]);
console.log(data);
console.log(data.toJsonFormat())


// loading a whole json to make a data struct
const whole_json = {
    name : 'whole tree',
    ownership : {
        name : 'sam',
        user_name : 'to',
        password : 'sam to'
    },
    owner_status : {
        max : 17,
        min : 0,
        mode : 3,
        median : 13
    },
    scheduled_events : [
        {
            year : 2019,
            month : 9,
            day : 9,
            hobby : 'coding',
            start : '9:00am',
            hours : 4,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 7,
            day : 1,
            hobby : 'typing',
            start : '11:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            hobby : 'reading',
            start : '12:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            hobby : 'reading',
            start : '4:00apm',
            hours : 1,
            end : '5:00pm'
        }
    ]

}
console.log('load whole json file')
const whole_data = JsonDataStruct.fromJsonFormat(whole_json);
console.log(whole_data);
console.log(whole_data.toJsonFormat());