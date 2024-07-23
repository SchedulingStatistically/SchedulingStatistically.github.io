/* 
    **** Do NOT MODIFY! ****

   **** json data structure ****

    if you want to study and edit the code, CREATE A NEW BRANCH.

    DO NOT MERGE you new branch, TEAM must review your code and 
    approve the changes you have made! 

    WHEN MODIFIED! ------- FORMATE the JsonDataStruct with Proper DOCUMENTATION and UNIT TESTS -------, Only then
    will new changes be reviewed by the team for APPROVAL!

    Feel free to ask me any question! I Strongly recommend everyone to take their time
    to understand the jsonDataStruct. I would help so much with development. 
    BACKEND DEVs MUST THOUGH!



    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "ONCE APPROVE! MERGE and push your testing code in the main branch"
*/

// CONSTANTS
const MIN_YEARS = 1
const MAX_YEARS = Infinity
const MIN_MONTHS = 1
const MAX_MONTHS = 12
const MIN_DAYS = 1
const MAX_DAYS = 31
const TIME_ZERO = 0

import * as stats from './node_modules/simple-statistics/dist/simple-statistics.mjs'

// event class is the attribute of a given event that takes place
class AnEvent {
    constructor(year, month, day, an_event, start, hours, end, complete, id) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.an_event = an_event;
        this.start = start;
        this.hours = hours;
        this.end = end;
        this.complete = complete
        this.id = id
    }

    toJsonFormat() {
        return {
            year : this.year,
            month : this.month,
            day : this.day,
            an_event : this.an_event,
            start : this.start,
            hours : this.hours,
            end : this.end,
            complete: this.complete,
            id : this.id
        };
    }

    static fromJsonFormat(json) {
        return new AnEvent(json.year, json.month, json.day, json.an_event, json.start, json.hours, json.end, json.complete, json.id);
    }
}

// DailyEvents class is a list of events that occur in a day
class DailyEvents {
    constructor(day, events) {
        this.day = day;
        this.current_id = -1;
        this.events = events;
    }

    toJsonFormat() {
        return {
            day : this.day,
            current_id : this.current_id,
            events : this.events.map(an_event => an_event.toJsonFormat())
        }
    }

    static fromJsonFormat(json){
        const events = json.events.map(an_event => AnEvent.fromJsonFormat(an_event))
        return new DailyEvents(json.day, events)
    }

    addTo_events(json) {
        this.current_id++
        const generated_id = json.year + json.month * 10000 + json.day * 1000000 + this.current_id * 100000000
        this.events.push(new AnEvent(json.year, json.month, json.day, json.an_event, json.start, json.hours, json.end, false, generated_id))
    }

    updateTo_events(json) {
        const selected_event_index = this.events.findIndex(the_event => the_event.id === json.id)
        if (selected_event_index !== -1) {
            delete this.events[selected_event_index]
            this.events[selected_event_index] = new AnEvent(json.year, json.month, json.day, json.an_event, json.start, json.hours, json.end, json.complete, json.id)
        }else{
            console.error('id is valid')
        }
    }

    deleteFrom_events(json) {
        const selected_event_index = this.events.findIndex(the_event => the_event.id === json.id)
        if (selected_event_index !== -1) {
            delete this.events[selected_event_index]
            this.events.splice(selected_event_index, 1)
        }else{
            console.error('id is valid')
        }
    }
}

// MonthlyEvents is a list of dailyEvents that occur in a month
class MonthlyEvents {
    constructor(month, daily_events) {
        this.month = month;
        this.daily_events = daily_events;
    }

    toJsonFormat() {
        return {
            month : this.month,
            daily_events : this.daily_events.map(the_events => the_events.toJsonFormat())
        }
    }

    static fromJsonFormat(json){
        const daily_events = json.daily_events.map(the_events => DailyEvents.fromJsonFormat(the_events))
        return new MonthlyEvents(json.month, daily_events)
    }

    addTo_dailyEvents(json) {
        const found_daily_event = this.daily_events.find(the_events => the_events.day === json.day)
        if(found_daily_event){
            found_daily_event.addTo_events(json.event)
        }else{
            const new_daily_event = new DailyEvents(json.day, [])
            new_daily_event.addTo_events(json.event)
            this.daily_events.push(new_daily_event)
        }
    }

    updateTo_dailyEvents(json) {
        const found_daily_event = this.daily_events.find(the_events => the_events.day === json.day)
        if(found_daily_event){
            found_daily_event.updateTo_events(json.event)
        }else{
            console.error('date of day is not valid')
        }
    }

    deleteFrom_dailyEvents(json) {
        const found_daily_event = this.daily_events.find(the_events => the_events.day === json.day)
        if(found_daily_event){
            found_daily_event.deleteFrom_events(json.event)
        }else{
            console.error('date of day is not valid')
        }
    }
}

// YearlyEvents is a list of MonthlyEvents that occur in a year
class YearlyEvents {
    constructor(year, monthly_events) {
        this.year = year;
        this.monthly_events = monthly_events;
    }

    toJsonFormat() {
        return {
            year : this.year,
            monthly_events : this.monthly_events.map(the_events => the_events.toJsonFormat())
        }
    }

    static fromJsonFormat(json){
        const monthly_events = json.monthly_events.map(the_events => MonthlyEvents.fromJsonFormat(the_events))
        return new YearlyEvents(json.year, monthly_events)
    }

    addTo_monthlyEvents(json) {
        const monthly_event = this.monthly_events.find(the_event => the_event.month === json.month)
        if(monthly_event) {
            monthly_event.addTo_dailyEvents(json.daily_event)
        }else{
            const new_monthly_event = new MonthlyEvents(json.month, [])
            new_monthly_event.addTo_dailyEvents(json.daily_event)
            this.monthly_events.push(new_monthly_event)
        }
    }

    updateTo_monthlyEvents(json) {
        const monthly_event = this.monthly_events.find(the_event => the_event.month === json.month)
        if(monthly_event) {
            monthly_event.updateTo_dailyEvents(json.daily_event)
        }else{
            console.error('date of month is not valid')
        }
    }

    deleteFrom_monthlyEvents(json) {
        const monthly_event = this.monthly_events.find(the_event => the_event.month === json.month)
        if(monthly_event) {
            monthly_event.deleteFrom_dailyEvents(json.daily_event)
        }else{
            console.error('date of month is not valid')
        }
    }
}

// ScheduledEvent contains all YearlyEvents within a category of distribution
class ScheduledEvent {
    constructor(category, yearly_events) {
        this.category = category;
        this.yearly_events = yearly_events;
    }

    toJsonFormat() {
        return {
            category : this.category,
            yearly_events : this.yearly_events.map(the_events => the_events.toJsonFormat())
        };
    }

    static fromJsonFormat(json) {
        const yearly_events = json.yearly_events.map(the_events => YearlyEvents.fromJsonFormat(the_events))
        // const yearly_events = 0;
        return new ScheduledEvent(json.category, yearly_events);
    }

    addTo_yearlyEvents(json) {
        const yearly_event = this.yearly_events.find(the_event => the_event.year === json.year)
        if(yearly_event) {
            yearly_event.addTo_monthlyEvents(json.monthly_event)
        }else{
            const new_yearly_event = new YearlyEvents(json.year, [])
            new_yearly_event.addTo_monthlyEvents(json.monthly_event)
            this.yearly_events.push(new_yearly_event)
        }
    }

    updateTo_yearlyEvents(json) {
        const yearly_event = this.yearly_events.find(the_event => the_event.year === json.year)
        if(yearly_event) {
            yearly_event.updateTo_monthlyEvents(json.monthly_event)
        }else{
            console.error('date of year is not valid')
        }
    }

    deleteFrom_yearlyEvents(json) {
        const yearly_event = this.yearly_events.find(the_event => the_event.year === json.year)
        if(yearly_event) {
            yearly_event.deleteFrom_monthlyEvents(json.monthly_event)
        }else{
            console.error('date of year is not valid')
        }
    }
    
}

// EventStatus contains the status of a selected event by name
class EventStatus {
    constructor(an_event, max, min, median, mode, mean, ratio, total, percent) {
        this.an_event = an_event;
        this.max = max;
        this.min = min;
        this.median = median;
        this.mode = mode;
        this.mean = mean
        this.ratio = ratio
        this.total = total
        this.percent = percent
    }

    toJsonFormat() {
        return {
            an_event : this.an_event,
            max : this.max,
            min : this.min,
            median : this.median,
            mode : this.mode,
            mean : this.mean,
            ratio : this.ratio,
            total : this.total,
            percent : this.percent
        }
    }

    static fromJsonFormat(json) {
        return new EventStatus(json.an_event, json.max, json.min, json.median, json.mode, json.mean, json.ratio, json.total, json.percent)
    }
}

// PeriodStatus contains the attribute of event status by time period
class PeriodStatus {
    constructor(an_event, year, month, day, total, complete) {
        this.an_event = an_event;
        this.year = year
        this.month = month
        this.day = day
        this.total = total
        this.complete = complete
    }

    toJsonFormat() {
        return {
            an_event : this.an_event,
            year : this.year,
            month : this.month,
            day : this.day,
            total : this.total,
            complete : this.complete
        }
    }

    static fromJsonFormat(json) {
        return new PeriodStatus(json.an_event, json.year, json.month, json.day, json.total, json.complete)
    }
}

// OwnerStatus status contains a list of EventStatus and PeriodStatus 
// which can be plotted as stats data
class OwnerStatus {
    constructor(global_status, current_status_scope, all_event_status, all_period_status) {
        this.your_global_status = global_status;
        this.current_status_scope = current_status_scope;
        this.all_event_status = all_event_status;
        this.all_period_status = all_period_status;
    }

    toJsonFormat() {
        return {
            your_global_status : this.your_global_status,
            current_status_scope : this.current_status_scope,
            all_event_status : this.all_event_status.map(an_event_status => an_event_status.toJsonFormat()),
            all_period_status : this.all_period_status.map(a_period_status => a_period_status.toJsonFormat())
        };
    }

    static fromJsonFormat(json) {
        const all_event_status = json.all_event_status.map(an_event_status => EventStatus.fromJsonFormat(an_event_status));
        const all_period_status = json.all_period_status.map(a_period_status => PeriodStatus.fromJsonFormat(a_period_status))
        return new OwnerStatus(json.your_global_status, json.current_status_scope, all_event_status, all_period_status);
    }

    empty_all_event_status() {
        this.all_event_status = [];
    }

    empty_all_period_status() {
        this.all_period_status = [];
    }

    addEvent_status(new_status) {
        this.all_event_status.push(new EventStatus(new_status.an_event, new_status.max, new_status.min, new_status.median, new_status.mode, new_status.mean, new_status.ratio, new_status.total, new_status.percent));
    }

    addPeriod_status(new_status) {
        this.all_period_status.push(new PeriodStatus(new_status.an_event, new_status.year, new_status.month, new_status.day, new_status.total, new_status.complete))
    }

    removeEvent_status() {
        this.all_event_status.pop()
    }

    removePeriod_status() {
        this.all_period_status.pop()
    }
}

// Ownership is the heading of the file with name and user name attribute
class Ownership {
    constructor(name, user_name, password) {
        this.name = name;
        this.user_name = user_name;
        this.password = password;
    }

    toJsonFormat(){
        return {
            name : this.name,
            user_name : this.user_name,
            password : this.password,
        };
    }

    static fromJsonFormat(json){
        return new Ownership(json.name, json.user_name, json.password);
    }
}

// JsonDataStruct contains Ownership, OwnerStatus, and ScheduledEvent classes
// as attribute to structure all classes into a single json object
// all classes are structure into a single json object
class JsonDataStruct {
    // class global variable for functions
    // the act as buffers of communication


    // saves a list of filtered event in a time partitions 
    temp_event_list = [];                   // is the list of filter events
   
    // used for computing event status
    temp_solved_event_list = [];            // use by solve type of event functions
    temp_period_event_status = [];          // used by solve period of event functions
   
    // used for partitioning events by time
    temp_event_category_partition = [];     // used for category partitioning
    temp_yearly_event_partition = [];       // used for yearly partitioning
    temp_monthly_event_partition = [];      // used for monthly partitioning
    temp_daily_event_partition = [];        // used for daily partition
   
    // used for buffering status data
    temp_events_status = {an_event : '', max : 0, min : 0, median : 0, mode : 0}
    temp_period_status = {year : 0, month : 0, day : 0, total : 0, complete : 0}

    // constructor
    constructor(name, ownership, owner_status, scheduled_events){
        this.name = name;
        this.ownership = ownership;
        this.owner_status = owner_status;
        this.scheduled_events = scheduled_events;
    }

    toJsonFormat(){
        return {
            name: this.name,
            ownership : this.ownership.toJsonFormat(),
            owner_status : this.owner_status.toJsonFormat(),
            scheduled_events : this.scheduled_events.map(an_event => an_event.toJsonFormat()),
        };
    }

    static fromJsonFormat(json){
        const ownership = Ownership.fromJsonFormat(json.ownership);
        const owner_status = OwnerStatus.fromJsonFormat(json.owner_status);
        const scheduled_events = json.scheduled_events.map(an_event => ScheduledEvent.fromJsonFormat(an_event));
        return new JsonDataStruct(json.name, ownership, owner_status, scheduled_events);
    }

    /*
    FUNCTION FOR UPDATING ATTRIBUTE IN A GIVE TIME PERIOD
    
    the following function bellow are used for creating, deleting, and updating the
    data structure object.
    */

    getName(){
        return this.name;
    }

    updateName(newName){
        this.name = newName;
    }

    getOwnership(){
        return this.ownership;
    }

    updateOwnership(newOwnership){
        this.ownership = Ownership.fromJsonFormat(newOwnership);
    }

    get getOwner_status(){
        return this.owner_status;
    }

    // delete save event status
    emptyOwnerEventStatus() {
        this.owner_status.empty_all_event_status();
    }

    // delete save period status
    emptyOwnerPeriodStatus() {
        this.owner_status.empty_all_period_status()
    }
    
    add_an_event_status_toOwnerStatus(new_status) {
        this.owner_status.addEvent_status(new_status);
    }

    add_a_period_status_toOwnerStatus(new_status) {
        this.owner_status.addPeriod_status(new_status)
    }

    remove_an_event_status_fromOwnerStatus() {
        this.owner_status.removeEvent_status();
    }

    remove_a_period_status_fromOwnerStatus() {
        this.owner_status.removePeriod_status()
    }

    getEvent_status() {
        return this.owner_status.toJsonFormat()
    }

    // update OwnerStatus class with a compatible json data object
    updateOwner_status(newOwner_status){
        this.owner_status = OwnerStatus.fromJsonFormat(newOwner_status)
    }

    getScheduled_events(){
        return this.scheduled_events;
    }

    // create new objects for an event object by year month and day
    // it only accept a compatible json object as input
    // use jsonDataStructInter file to find the json format
    schedule_an_event(json) {
        const scheduled_event_category = this.scheduled_events.find(the_event => the_event.category === json.category)
        if(scheduled_event_category) {
            scheduled_event_category.addTo_yearlyEvents(json.yearly_event)
        }else{
            const new_scheduled_event_category = new ScheduledEvent(json.category, [])
            new_scheduled_event_category.addTo_yearlyEvents(json.yearly_event)
            this.scheduled_events.push(new_scheduled_event_category)
        }
    }

    // updates an existing event object by traversing the data structure
    // it only accept a compatible json object as input
    // use jsonDataStructInter file to fine the json format
    update_a_scheduled_event(json) {
        const scheduled_event_category = this.scheduled_events.find(the_event => the_event.category === json.category)
        if(scheduled_event_category) {
            scheduled_event_category.updateTo_yearlyEvents(json.yearly_event)
        }else{
            console.error('category is not valid')
        }
    }

    // delete an existing event object by traversing the data structure
    // it only accept a compatible json object as input
    // use jsonDataStructInter file to fine the json format
    delete_a_scheduled_event(json) {
        const scheduled_event_category = this.scheduled_events.find(the_event => the_event.category === json.category)
        if(scheduled_event_category) {
            scheduled_event_category.deleteFrom_yearlyEvents(json.yearly_event)
        }else{
            console.error('category is not valid')
        }
    }

    // delete the top most object of data scheduled_events array
    remove_top_scheduled_event(){
        this.scheduled_events.shift()
    }

    // deletes the bottom most of data scheduled_events array
    remove_bottom_scheduled_event() {
        this.scheduled_events.pop()
    }



    /*
        FUNCTION FOR PARTITIONING EVENT IN A TIME PERIOD

        The following functions bellow are used for partitioning event by time
        they partition events by years, months, and days
    */

    // partition by years
    partition_years(category, start_year, end_year) {
        this.temp_yearly_event_partition = []
        const selected_category = this.scheduled_events.find(the_event => the_event.category === category)
        if(selected_category) {
            this.temp_yearly_event_partition = selected_category.yearly_events.filter(
                function(the_event) {
                    return (the_event.year <= end_year && start_year <=the_event.year);
                })
        } 
    }

    // partition_years to months
    partition_years_into_month(category, start_year, end_year) {
        this.temp_monthly_event_partition = []
        this.partition_years(category, start_year, end_year)
        this.temp_yearly_event_partition.forEach(the_event => {
            this.temp_monthly_event_partition = this.temp_monthly_event_partition.concat(the_event.monthly_events)
        })
    }

    // partition_years to days
    partition_years_into_days(category, start_year, end_year) {
        this.temp_daily_event_partition = []
        this.partition_years_into_month(category, start_year, end_year)
        this.temp_monthly_event_partition.forEach(the_event => {
            this.temp_daily_event_partition = this.temp_daily_event_partition.concat(the_event.daily_events)
        })
    }

    // partition_months
    partition_months(category, year, start_month, end_month) {
        this.temp_monthly_event_partition = []
        this.partition_years(category, year, year)
        const selected_year = this.temp_yearly_event_partition.find(the_event => the_event.year === year)
        if(selected_year) {
            this.temp_monthly_event_partition = selected_year.monthly_events.filter(
                    function(the_event) {
                        return (the_event.month <= end_month && start_month <=the_event.month);
                    }) 
        }

    }

    // partition_months to days
    partition_months_into_days(category, year, start_month, end_month) {
        this.temp_daily_event_partition = []
        this.partition_months(category, year, start_month, end_month)
        this.temp_monthly_event_partition.forEach(the_event => {
            this.temp_daily_event_partition = this.temp_daily_event_partition.concat(the_event.daily_events)
        })
    }

    // partition_days
    partition_days(category, year, month, start_day, end_day) {
        this.temp_daily_event_partition = []
        this.partition_months(category, year, month, month) 
        const selected_month = this.temp_monthly_event_partition.find(the_event => the_event.month === month)
        if(selected_month) {
            this.temp_daily_event_partition = selected_month.daily_events.filter(
                function(the_event) {
                    return (the_event.day <= end_day && start_day <=the_event.day);
                }) 
        }
    }

    // filter partition_days to events in temp_event_list array
    filter_events_from_daily_event_partition() {
        this.temp_event_list = []
        this.temp_daily_event_partition.forEach(event_array => {
            this.temp_event_list = this.temp_event_list.concat(event_array.events)
        })
    }

    /*
        FUNCTION FOR COMPUTING EVENT STATUS

        the following function compute status of events in
        a given array: temp_event_list and temp_solved_event_list

        It includes basic statical computation:
        max, min, mode mean, total percent
    */

    init_temp_event_status(){
        this.temp_events_status = {an_event : '', max : 0, min : 0, median : 0, mode : 0, mean : 0, ratio : 0, total : 0, percent : 0 }
    }

    filter_an_event_type(event_type) {
        let this_of_type_events = this.temp_event_list.filter(function(the_event) {
            return the_event.an_event === event_type;
        });
        this.temp_solved_event_list = this_of_type_events;
        this.temp_events_status.an_event = event_type
        return this_of_type_events;
    }

    solve_total_of_all_event() {
        let total = 0;
        this.temp_solved_event_list.forEach(function(the_event, index) {
            total = total + 1;
        });
        this.temp_events_status.total = total;
        return total;
    }

    solve_min_of_all_events() {
        let list_of_hours = this.temp_solved_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let min_value = stats.min(list_of_hours);
        this.temp_events_status.min = min_value;
        return min_value;
    }

    solve_max_of_all_events() {
        let list_of_hours = this.temp_solved_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let max_value = stats.max(list_of_hours);
        this.temp_events_status.max = max_value;
        return max_value;
    }

    solve_median_of_all_events() {
        let list_of_hours = this.temp_solved_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let median_value = stats.median(list_of_hours);
        this.temp_events_status.median = median_value;
        return median_value;
    }

    solve_mode_of_all_events() {
        let list_of_hours = this.temp_solved_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let mode_value = stats.mode(list_of_hours);
        this.temp_events_status.mode = mode_value;
        return mode_value;
    }

    solve_mean_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let mean_value = stats.mean(list_of_hours);
        this.temp_events_status.mean = mean_value;
        return mean_value;
    }

    // setup the computation for a complete status of an event name
    compute_an_event_status_type(event_status_type) {
        this.init_temp_event_status()
        this.filter_an_event_type(event_status_type)
        this.solve_min_of_all_events()
        this.solve_max_of_all_events()
        this.solve_median_of_all_events()
        this.solve_mode_of_all_events()
        this.solve_mean_of_all_events()
        this.solve_total_of_all_event()
        this.add_an_event_status_toOwnerStatus(this.temp_events_status)
    }

    // setup the computation for a complete status of an event name in a array
    compute_a_set_of_event_types_status(event_type_status_list) {
        for (const event_status_type of event_type_status_list){
            // console.log(event_status_type)
            this.compute_an_event_status_type(event_status_type)
        }
    }


    /*
    FUNCTIONS FOR SOLVING PERIOD STATUS

    the following function compute the status of an event in a given array: temp_event_list and temp_solve_event_list
    compute the number of event occurring in a time period
    and the number of complete events
    */

    solve_complete_of_all_events_in_a_period() {
        let completion_count = 0
        this.temp_solved_event_list.forEach(function(the_event) {
            if( the_event.complete === true) {completion_count++}
        })
        this.temp_period_status.complete = completion_count;
        return completion_count;
    }

    solve_total_of_all_event_in_a_period() {
        const total = this.temp_solved_event_list.length
        this.temp_period_status.total = total
        return total
    }

    init_temp_period_status() {
        this.temp_period_status = {year : 0, month : 0, day : 0, total : 0, complete : 0}
    }

    // setup the computation of period status in a given time period and interval
    compute_period_status_by_n_period_days_in_years(category, start_year, end_year, n_period_days) {
        this.temp_period_event_status = []
        this.partition_years(category, start_year, end_year)
        for(const a_yearly_event of this.temp_yearly_event_partition) {
            this.partition_months(category,a_yearly_event.year, MIN_MONTHS, MAX_MONTHS)
            for(const a_monthly_event of this.temp_monthly_event_partition) {
                for(let day = 0; day < 31; day = day + n_period_days) {
                    this.init_temp_period_status()
                    this.temp_period_status.year = a_yearly_event.year
                    this.temp_period_status.month = a_monthly_event.month
                    this.temp_period_status.day = day
                    this.partition_days(category, a_yearly_event.year, a_monthly_event.month, day, day + n_period_days)
                    this.filter_events_from_daily_event_partition()
                    this.temp_solved_event_list = this.temp_event_list
                    this.solve_complete_of_all_events_in_a_period()
                    this.solve_total_of_all_event_in_a_period()
                    this.add_a_period_status_toOwnerStatus(this.temp_period_status)
                    this.temp_period_event_status.push(this.temp_period_status)
                }
            }
        }
    }


    
}

export {ScheduledEvent, OwnerStatus, Ownership, JsonDataStruct};
// export default OwnerStatus;