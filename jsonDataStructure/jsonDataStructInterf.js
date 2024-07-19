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
        this.event_types_to_be_computed = []
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

    remove_top_Completed_event(){
        this.json_object.remove_top_scheduled_event()
    }

    remove_bottom_Completed_event() {
        this.json_object.remove_bottom_scheduled_event()
    }

    reset_event_status() {
        this.json_object.emptyOwnerEventStatus()
    }

    reset_period_status() {
        this.json_object.emptyOwnerPeriodStatus()
    }

    accessor_object_filter_events() {
        return this.json_object.temp_event_list
    }

    get_events_within_a_yearly_time_partition(category, start_year, end_year) {
        // this.json_object.empty_temp_event_list()
        // this.json_object.yearly_event_partition(category, start_year, end_year)
        // this.json_object.filter_events_from_yearly_event_partition()
        // test new functions
        // this.json_object.partition_years(category,start_year, end_year)
        // this.json_object.filter_events_from_yearly_event_partition()
        // test new functions
        // this.json_object.partition_years_into_month(category,start_year, end_year)
        // this.json_object.filter_events_from_monthly_event_partition()
        // test new functions
        this.json_object.partition_years_into_days(category, start_year, end_year)
        this.json_object.filter_events_from_daily_event_partition()
    }

    get_events_within_a_monthly_time_partition(category, year, start_month, end_month) {
        // this.json_object.empty_temp_event_list()
        // this.json_object.yearly_event_partition(category, year, year)
        // this.json_object.monthly_event_partition(year, start_month, end_month)
        // this.json_object.filter_events_from_monthly_event_partition()
        // test new functions
        // this.json_object.partition_months(category, year, start_month, end_month)
        // this.json_object.filter_events_from_monthly_event_partition()
        // test new functions
        this.json_object.partition_months_into_days(category, year,start_month, end_month)
        this.json_object.filter_events_from_daily_event_partition()
    }

    get_events_within_a_daily_time_partition(category, year, month, start_day, end_day) {
        // this.json_object.empty_temp_event_list()
        // this.json_object.yearly_event_partition(category, year, year)
        // this.json_object.monthly_event_partition(year, month, month)
        // this.json_object.daily_event_partition(month, start_day, end_day)
        // this.json_object.filter_events_from_daily_event_partition()
        // test new function
        this.json_object.partition_days(category, year, month, start_day, end_day)
        this.json_object.filter_events_from_daily_event_partition()
    }

    compute_an_event_status(event_type) {
        this.json_object.emptyOwnerEventStatus()
        this.json_object.compute_an_event_status_type(event_type)
    }

    add_an_event_type(event_type) {
        this.event_types_to_be_computed.push(event_type)
    }

    rest_event_types() {
        this.event_types_to_be_computed = []
    }

    compute_all_event_status_type(){
        this.json_object.emptyOwnerEventStatus()
        this.json_object.compute_a_set_of_event_types_status(this.event_types_to_be_computed)
    }

    compute_event_in_by_period_of_days(category, start_year, end_year, days_period) {
        this.json_object.compute_events_in_a_yearly_span_and_days_period(category, start_year, end_year, days_period)
    }

    compute_event_in_by_period_of_days_v0(category, start_year, end_year, n_period_days) {
        this.json_object.compute_period_status_by_n_period_days_in_years(category, start_year, end_year, n_period_days)
    }

    accessor_object_period_status(){
        return this.json_object.temp_period_event_status
    }

    accessor_object_event_status() {
        return this.json_object.getEvent_status()
    }

    getJsonObjectString(){
        const json_string = JSON.stringify(this.json_object.toJsonFormat(), null, 2);
        return json_string;
    }

}