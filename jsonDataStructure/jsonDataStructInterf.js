/*
    DO NOT MODIFY THE MAIN BRANCH OF jsonDataStructInterf.js unless YOUR MERGE IS APPROVED

    to test and modify the code, create your BRANCH
    before you merge your branch, the backend team must review YOUR BRANCH for APPROVAL!

*/

import  {ScheduledEvent, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'
// loading a whole json to make a data struct
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

// pending documentation!
export default class jsonDataStructInterf {
    constructor(name){
        this.name = name;
        this.json_object = null;
    }

    use_default_json_data(){
        this.json_object = JsonDataStruct.fromJsonFormat(whole_json);
    }

    accessor_object_json_format() {
        return this.json_object.toJsonFormat()
    }

    updateOwnership(name, user_name, password){
        let owner = {
            name : name,
            user_name : user_name,
            password : password
        }
        this.json_object.updateOwnership(owner);
    }

    addComplete_events(i_category, i_year, i_month, i_day, i_an_event, i_start, i_hours, i_end){
        const event_To_json = 
            {category : i_category, yearly_event : 
                {year : i_year, monthly_event :
                    {month : i_month, daily_event :
                        {day : i_day, event :
                            {
                                year : i_year,
                                month : i_month,
                                day : i_day,
                                an_event : i_an_event,
                                start : i_start,
                                hours : i_hours,
                                end : i_end,

                            }
                            
                        }
                    }
                }
            };
        this.json_object.schedule_an_event(event_To_json)
    }

    remove_top_Completed_event(){
        this.json_object.remove_top_scheduled_event()
    }

    remove_bottom_Completed_event() {
        this.json_object.remove_bottom_scheduled_event()
    }

    getJsonObjectString(){
        const json_string = JSON.stringify(this.json_object.toJsonFormat(), null, 2);
        return json_string;
    }

    reset_event_status() {
        this.json_object.emptyOwnerStatus()
    }

    get_events_within_a_time_partition

    compute_an_event_status(event_type) {
        this.json_object.compute_an_event_type_status(event_type)
    }


}