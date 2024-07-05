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
    your_global_status : 'global status 2019828',
    current_status_scope : "yearly: 2017 to 2020",
    all_event_status : [
        {an_event : 'coding', max : 70, min : 15, median : 35, mode : 40}
    ]
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
    an_event : 'coding',
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
        your_global_status : 'global status 2019828',
        current_status_scope : "yearly: 2017 to 2020",
        all_event_status : [
            {an_event : 'coding', max : 70, min : 15, median : 35, mode : 40}
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
            hours : 1,
            end : '5:00pm'
        }
    ]
}

console.log('load whole json file')
const whole_data = JsonDataStruct.fromJsonFormat(whole_json);
console.log(whole_data);
console.log(whole_data.toJsonFormat());

console.log('test update functions')
console.log('update name, ownership, status, and scheduled events')
whole_data.updateName('ben')

whole_data.updateOwnership({name : 'ben', user_name : "row", password : 'ben row'})
const status2_json = {
    your_global_status : 'global status 2021818',
    current_status_scope : "yearly: 2020 to 2022",
    all_event_status : [
        {an_event : 'writing', max : 80, min : 25, median : 40, mode : 45},
        {an_event : 'learning', max : 90, min : 60, median : 75, mode : 70}
    ]
}
whole_data.updateOwner_status(status2_json)
console.log('add and remove hobbies for owner_status')
whole_data.addEvent_ToOwnerStatus({an_event : 'soccer', max : 60, min : 25, median : 50, mode : 55})
whole_data.addEvent_ToOwnerStatus({an_event : 'gaming', max : 180, min : 65, median : 160, mode : 160})
console.log(whole_data)
const updated_events = [
    {
        year : 2014,
        month : 12,
        day : 9,
        an_event : 'gaming',
        start : '11:00am',
        hours : 6,
        end : '4:00pm'
    },
    {
        year : 2017,
        month : 1,
        day : 1,
        an_event : 'running',
        start : '4:00pm',
        hours : 1,
        end : '6:00pm'
    }
]

const add_event_1 = {
    year : 2018,
    month : 1,
    day : 1,
    an_event : 'studying',
    start : '8:00am',
    hours : 4,
    end : '6:00pm'
}

whole_data.updateScheduled_events(updated_events);
whole_data.addScheduled_event(add_event_1);
console.log(whole_data)
// console.log(whole_data.toJsonFormat())

console.log('test access function then update an object attribute')
let get_name = whole_data.getName()
console.log('accessed name of json ' + get_name);
get_name = 'JSON Den'
whole_data.updateName(get_name);
let get_owner = whole_data.getOwnership()
console.log('accessed owner ' + get_owner);
get_owner.name = 'get Den';
// let get_status = whole_data.getOwner_status
// console.log('accessed status ' + get_status);
// get_status.max = 49
console.log(whole_data);

