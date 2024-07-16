/*

    USE FOR DEBUGGING

    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"

*/

import  {ScheduledEvent, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'

// loading a whole json to make a data struct
// const whole_json = {
//     name : 'whole tree',
//     ownership : {
//         name : 'sam',
//         user_name : 'to',
//         password : 'sam to'
//     },
//     owner_status : {
//         your_global_status : 'global status 2019828',
//         current_status_scope : "yearly: 2017 to 2020",
//         all_event_status : [
//             {an_event : 'coding', max : 70, min : 15, median : 35, mode : 40}
//         ]
//     },
//     scheduled_events : [
//         {
//             category : 'default', 
//             yearly_events : [
//                 {year : 2018, monthly_events : [
//                     {month : 12, daily_events : [
//                         {day : 12, events :[
//                             {
//                                 year : 2018,
//                                 month : 12,
//                                 day : 11,
//                                 an_event : 'coding',
//                                 start : '10:00pm',
//                                 hours : 3,
//                                 end : '3:00pm',
            
//                             }
//                         ]
                            
//                         }
//                     ]
//                     }
//                 ]
//                 }
//             ]
//             }
//         ]
//         }

// console.log('load whole json file')
// const whole_data = JsonDataStruct.fromJsonFormat(whole_json);
// console.log(whole_data);
// console.log(whole_data.toJsonFormat());

// console.log('test partition of the list')
// console.log(whole_data.temp_event_category_partition)
// whole_data.yearly_event_partition('default', 2018, 2018)
// console.log(whole_data.temp_yearly_event_partition)
// whole_data.monthly_event_partition(2018, 1,12)
// console.log(whole_data.temp_monthly_event_partition)
// whole_data.daily_event_partition(12, 0, 31)
// console.log(whole_data.temp_daily_event_partition)
// whole_data.filter_events_from_daily_event_partition()
// console.log(whole_data.temp_event_list)
// console.log('test data analysis methods')
// whole_data.filter_an_event_type('coding')
// whole_data.solve_min_of_all_events()
// whole_data.solve_max_of_all_events()
// whole_data.solve_median_of_all_events()
// whole_data.solve_mode_of_all_events()
// whole_data.add_an_event_status_toOwnerStatus(whole_data.temp_events_status)
// // whole_data.compute_an_event_type_status('reading')
// console.log(whole_data.owner_status)


console.log('added scheduled event')
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
            category : 'default', 
            yearly_events : [
                {year : 2018, monthly_events : [
                    {month : 12, daily_events : [
                        {day : 12, events :[
                            {
                                year : 2018,
                                month : 12,
                                day : 11,
                                an_event : 'coding',
                                start : '10:00pm',
                                hours : 3,
                                end : '3:00pm',
            
                            }
                        ]
                            
                        }
                    ]
                    }
                ]
                }
            ]
            }
        ]
        }

console.log('load whole json file')
const whole_data = JsonDataStruct.fromJsonFormat(whole_json);
console.log(whole_data);
console.log(whole_data.toJsonFormat());

// console.log('test added events')
const event0 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 12, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'coding',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event1 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 12, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'gaming',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event2 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 12, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'running',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event3 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'running',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event4 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'gaming',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event5 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 11, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'writing',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event6 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'running',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event7 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'gaming',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event8 = 
{category : 'default', yearly_event : 
    {year : 2018, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2018,
                    month : 12,
                    day : 11,
                    an_event : 'writing',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event9 = 
{category : 'default', yearly_event : 
    {year : 2019, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2019,
                    month : 12,
                    day : 11,
                    an_event : 'running',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event10 = 
{category : 'default', yearly_event : 
    {year : 2019, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2019,
                    month : 12,
                    day : 11,
                    an_event : 'gaming',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
const event11 = 
{category : 'default', yearly_event : 
    {year : 2019, monthly_event :
        {month : 12, daily_event :
            {day : 14, event :
                {
                    year : 2019,
                    month : 12,
                    day : 11,
                    an_event : 'writing',
                    start : '10:00pm',
                    hours : 3,
                    end : '3:00pm',

                }
                
            }
        }
    }
};
whole_data.schedule_an_event(event0)
whole_data.schedule_an_event(event1)
whole_data.schedule_an_event(event2)
whole_data.schedule_an_event(event3)
whole_data.schedule_an_event(event4)
whole_data.schedule_an_event(event5)
whole_data.schedule_an_event(event6)
whole_data.schedule_an_event(event7)
whole_data.schedule_an_event(event8)
whole_data.schedule_an_event(event9)
whole_data.schedule_an_event(event10)
whole_data.schedule_an_event(event11)
console.log(whole_data.toJsonFormat())
console.log('test partition of the list')
console.log(whole_data.temp_event_category_partition)
whole_data.yearly_event_partition('default', 2018, 2018)
console.log(whole_data.temp_yearly_event_partition)
whole_data.monthly_event_partition(2018, 1,12)
console.log(whole_data.temp_monthly_event_partition)
whole_data.daily_event_partition(11, 0, 31)
console.log(whole_data.temp_daily_event_partition)
whole_data.filter_events_from_daily_event_partition()
console.log(whole_data.temp_event_list)

console.log('test status functions')
// whole_data.compute_an_event_status_type('coding')
whole_data.compute_a_set_of_event_types_status(['writing', 'coding', 'gaming'])
console.log(whole_data.owner_status)

