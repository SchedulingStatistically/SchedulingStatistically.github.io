

/*
    DO NOT MODIFY THE MAIN BRANCH OF jsonDataStructInterf.js unless YOUR MERGE IS APPROVED

    to test and modify the code, create your BRANCH
    before you merge your branch, the backend team must review YOUR BRANCH for APPROVAL!

*/



/*
    ======== json data structure  INTERFACE  =========

    this is an interface class, an ADOPTER of jsonDataStruct class

    it provides a abstraction oj jsonDataStruct class method functionality
*/


import  {ScheduledEvent, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'
// loading a default_json_object json to make a data struct
// loading a default_json_object json to make a data struct
const default_json_object = {
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
            {an_event : 'default', max : 0, min : 0, median : 0, mode : 0, mean : 0, ratio : 0, total : 0, percent : 0}
        ],
        all_period_status : [
            {year : 0, month : 0, day : 0, total : 0, complete : 0}
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
                                complete : false,
                                id : -1
            
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
        this.list_of_event_names = []
    }

    // The function creates and updates the json object 
    // classes(jsonDataStructInterf)
    // with the given default_json_object json object above
    use_default_json_data(){
        this.json_object = JsonDataStruct.fromJsonFormat(default_json_object);
    }

    // the function create and updates the json Object
    // classes(jsonDataStructInterf)
    // with the given json string file that is
    // compatible with the given json Object classes
    load_json_from_string_file_format(string_json_file) {
        let json_parse_object = null
        try {
            json_parse_object = JSON.parse(string_json_file)

        }catch(error){
            console.error('failed to parse json file', error);
        }
        this.json_object = JsonDataStruct.fromJsonFormat(json_parse_object)
    }

    // the function converts jsonDataStruct classes object into a json Object
    // and converts the json object to a json string file
    // the json string file can be saved
    getJsonObjectString(){
        const json_string = JSON.stringify(this.json_object.toJsonFormat(), null, 2);
        return json_string;
    }

    // the function converts jsonDataStruct classes into a json Object
    // and the json Object is optional for dev to perform
    // save optimization and json database Integration
    accessor_object_json_format() {
        return this.json_object.toJsonFormat()
    }

    // the function updates the Ownership class attributes
    // in JsonDataStruct class
    updateOwnership(name, user_name, password){
        let owner = {
            name : name,
            user_name : user_name,
            password : password
        }
        this.json_object.updateOwnership(owner);
    }

    // the functions add an AnEvent 
    // class (the event to be save) 
    // in jsonDataStructInterf
    addComplete_event(i_category, i_year, i_month, i_day, i_an_event, i_start, i_hours, i_end){
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

    // the functions finds and updates AnEvent 
    // class (an even all ready saved)
    // in JsonDataStruct
    update_the_complete_event(i_category, i_year, i_month, i_day, i_an_event, i_start, i_hours, i_end, complete, id){
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
                                complete : complete,
                                id : id
                            }
                            
                        }
                    }
                }
            };
        this.json_object.update_a_scheduled_event(event_To_json)
    }

    // the functions finds and deletes AnEvent 
    // class (an even all ready saved)
    // in JsonDataStruct
    delete_the_complete_event(i_category, i_year, i_month, i_day, i_an_event, i_start, i_hours, i_end, complete, id){
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
                                complete : complete,
                                id : id
                            }
                            
                        }
                    }
                }
            };
        this.json_object.delete_a_scheduled_event(event_To_json)
    }

    // the function remove AnEvent class 
    // added in JsonDataStruct
    // if fifo order
    remove_top_Completed_event(){
        this.json_object.remove_top_scheduled_event()
    }

    // the function remove AnEvent class 
    // added in JsonDataStruct
    // if lilo order
    remove_bottom_Completed_event() {
        this.json_object.remove_bottom_scheduled_event()
    }

    // the function deletes event status data
    reset_event_status() {
        this.json_object.emptyOwnerEventStatus()
    }

    // the function deletes periodic status data
    reset_period_status() {
        this.json_object.emptyOwnerPeriodStatus()
    }

    // the function return the events that are set in the object
    accessor_object_filter_events() {
        return this.json_object.temp_event_list
    }

    // the function set events within yearly partition in the object
    set_events_within_a_yearly_time_partition(category, start_year, end_year) {
        this.json_object.partition_years_into_days(category, start_year, end_year)
        this.json_object.filter_events_from_daily_event_partition()
    }

    // the function set events within monthly partition in the object
    set_events_within_a_monthly_time_partition(category, year, start_month, end_month) {
        this.json_object.partition_months_into_days(category, year,start_month, end_month)
        this.json_object.filter_events_from_daily_event_partition()
    }

    // the function set events within daily partition in the object
    set_events_within_a_daily_time_partition(category, year, month, start_day, end_day) {
        this.json_object.partition_days(category, year, month, start_day, end_day)
        this.json_object.filter_events_from_daily_event_partition()
    }

    // the function calculates event status on
    // a set events that are set in the object by event name
    solve_event_status_by_name(event_type) {
        this.json_object.emptyOwnerEventStatus()
        this.json_object.compute_an_event_status_type(event_type)
    }

    // adds an event name in the array attribute 
    // of the interface object
    add_an_event_name(event_type) {
        this.list_of_event_names.push(event_type)
    }

    // deletes all event names in the array attribute 
    // of the interface object
    reset_event_names() {
        this.list_of_event_names = []
    }

    // the function calculates event status on
    // a set events that are set in the object 
    // by all event names saved in the interface object
    solve_event_status_by_the_list_of_event_names(){
        this.json_object.emptyOwnerEventStatus()
        this.json_object.compute_a_set_of_event_types_status(this.list_of_event_names)
    }


    // the function calculates period status on
    // all event that occur within a yearly time partition
    // each period status occur in n_period_days
    solve_event_status_within_period_of_n_days(category, start_year, end_year, n_period_days) {
        this.json_object.emptyOwnerPeriodStatus()
        this.json_object.compute_period_status_by_n_period_days_in_years(category, start_year, end_year, n_period_days)
    }

    // the function return an array 
    // of recently computed period status
    accessor_object_period_status(){
        return this.json_object.temp_period_event_status
    }

    // the function return an array
    // of recently computed  event status
    accessor_object_event_status() {
        return this.json_object.getEvent_status()
    }


}