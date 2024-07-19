/* 
    **** Do NOT MODIFY! ****

    work is still in progress!

   **** PROTOTYPE json data structure ****


    if you want to study and edit the code, CREATE A NEW BRANCH.

    DO NOT MERGE you new branch, I must review your code and 
    understand the changes you have made! 

    ONLY! Once I ------- OFFICIALLY FORMATE the JsonDataStruct with Proper DOCUMENTATION -------, Only then
    will new changes be reviewed by the team for APPROVAL!

    Feel free to ask me any question! I Strongly recommend everyone to take their time
    to understand the jsonDataStruct. I would help so much with development. 
    BACKEND DEVs MUST THOUGH!



    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"
*/

import * as stats from './node_modules/simple-statistics/dist/simple-statistics.mjs'

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


class JsonDataStruct {
    temp_event_list = [];
    temp_solved_event_list = [];
    temp_period_event_status = [];
    temp_event_category_partition = [];
    temp_yearly_event_partition = [];
    temp_monthly_event_partition = [];
    temp_daily_event_partition = [];
    temp_events_status = {an_event : '', max : 0, min : 0, median : 0, mode : 0}
    temp_period_status = {year : 0, month : 0, day : 0, total : 0, complete : 0}
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

    emptyOwnerEventStatus() {
        this.owner_status.empty_all_event_status();
    }

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

    updateOwner_status(newOwner_status){
        this.owner_status = OwnerStatus.fromJsonFormat(newOwner_status)
    }

    getScheduled_events(){
        return this.scheduled_events;
    }

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

    update_a_scheduled_event(json) {
        const scheduled_event_category = this.scheduled_events.find(the_event => the_event.category === json.category)
        if(scheduled_event_category) {
            scheduled_event_category.updateTo_yearlyEvents(json.yearly_event)
        }else{
            console.error('category is not valid')
        }
    }

    delete_a_scheduled_event(json) {
        const scheduled_event_category = this.scheduled_events.find(the_event => the_event.category === json.category)
        if(scheduled_event_category) {
            scheduled_event_category.deleteFrom_yearlyEvents(json.yearly_event)
        }else{
            console.error('category is not valid')
        }
    }


    remove_top_scheduled_event(){
        this.scheduled_events.shift()
    }

    remove_bottom_scheduled_event() {
        this.scheduled_events.pop()
    }

    // updateScheduled_events(newScheduled_events){
    //     this.scheduled_events = newScheduled_events.map(event => new ScheduledEvent(event.year, event.month, event.day, event.an_event, event.start, event.hours,event.end));
    // }

    /*
        Time partition functions
    */

    empty_temp_event_list(){
        this.temp_event_list = [];
    }
    
    yearly_event_partition(category, start_year, end_year) {
        const selected_category = this.scheduled_events.find(the_event => the_event.category === category)
        if(selected_category) {
            this.temp_yearly_event_partition = selected_category.yearly_events.filter(
                function(the_event) {
                    return (the_event.year <= end_year && start_year <=the_event.year);
                })
        } 
    }

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

    partition_years_into_month(category, start_year, end_year) {
        this.temp_monthly_event_partition = []
        this.partition_years(category, start_year, end_year)
        this.temp_yearly_event_partition.forEach(the_event => {
            this.temp_monthly_event_partition = this.temp_monthly_event_partition.concat(the_event.monthly_events)
            // console.log(the_event.year, the_event.monthly_events)
            // console.log(this.temp_monthly_event_partition)
        })
    }

    partition_years_into_days(category, start_year, end_year) {
        this.temp_daily_event_partition = []
        this.partition_years_into_month(category, start_year, end_year)
        this.temp_monthly_event_partition.forEach(the_event => {
            this.temp_daily_event_partition = this.temp_daily_event_partition.concat(the_event.daily_events)
            // console.log(the_event.month, the_event.daily_events)
            // console.log(this.temp_daily_event_partition)
        })
    }

    monthly_event_partition(year, start_month, end_month) {
        const selected_year = this.temp_yearly_event_partition.find(the_event => the_event.year === year)
        if(selected_year) {
            this.temp_monthly_event_partition = selected_year.monthly_events.filter(
                    function(the_event) {
                        return (the_event.month <= end_month && start_month <=the_event.month);
                    }) 
        }
    }

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

    partition_months_into_days(category, year, start_month, end_month) {
        this.temp_daily_event_partition = []
        this.partition_months(category, year, start_month, end_month)
        this.temp_monthly_event_partition.forEach(the_event => {
            this.temp_daily_event_partition = this.temp_daily_event_partition.concat(the_event.daily_events)
        })
    }

    daily_event_partition(month, start_day, end_day) {
        const selected_month = this.temp_monthly_event_partition.find(the_event => the_event.month === month)
        if(selected_month) {
            this.temp_daily_event_partition = selected_month.daily_events.filter(
                function(the_event) {
                    return (the_event.day <= end_day && start_day <=the_event.day);
                }) 
            }
    }

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


    filter_events_from_daily_event_partition() {
        this.temp_event_list = []
        this.temp_daily_event_partition.forEach(event_array => {
            this.temp_event_list = this.temp_event_list.concat(event_array.events)
        })
    }


    filter_events_from_monthly_event_partition() {
        for(const a_monthly_event of this.temp_monthly_event_partition) {
            this.daily_event_partition(a_monthly_event.month, 1, 31)
            this.filter_events_from_daily_event_partition()
        }
    }

    filter_events_from_yearly_event_partition() {
        for(const a_yearly_event of this.temp_yearly_event_partition) {
            this.monthly_event_partition(a_yearly_event.year, 1, 12)
            this.filter_events_from_monthly_event_partition()
        }
    }

    // set_up_temp_event_status_solved_list() {
    //     this.temp_solved_event_list = Array.from(this.temp_event_list);
    // }



    /*
        FUNCTION BELLOW ARE FOR FILTERING JSON ARRAYS
        THE INTENT IT TO MAKE A PIPELINE TO PROCESS DATA WITH ARRAY
        FOR EXAMPLE LIST.REDUCE(LIST.MAP(NAME) + NAME)
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
            // return the_event.hours;
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

    solve_complete_of_all_events_in_a_period() {
        let completion_count = 0
        this.temp_solved_event_list.forEach(function(the_event) {
            if( the_event.complete === true) {completion_count++}
        })
        this.temp_period_status.complete = completion_count;
        return completion_count;
    }


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

    compute_a_set_of_event_types_status(event_type_status_list) {
        for (const event_status_type of event_type_status_list){
            // console.log(event_status_type)
            this.compute_an_event_status_type(event_status_type)
        }
    }

    /*
    add function that compute daily status
    */

    empty_temp_period_list(){
        this.temp_period_event_status = [];
    }

    init_temp_period_status() {
        this.temp_period_status = {year : 0, month : 0, day : 0, total : 0, complete : 0}
    }

    compute_events_in_periods_of_days_in_a_month(year, month, days_period) {
        for(let day = 0; day < 31; day = day + days_period) {
            this.empty_temp_event_list()
            this.init_temp_period_status()
            this.temp_period_status.year = year
            this.temp_period_status.month = month
            this.temp_period_status.day = day
            this.daily_event_partition(month, day, day + days_period)
            this.filter_events_from_daily_event_partition()
            this.temp_solved_event_list = this.temp_event_list
            this.solve_complete_of_all_events_in_a_period()
            this.add_a_period_status_toOwnerStatus(this.temp_period_status)
            this.temp_period_event_status.push(this.temp_period_status)
        }
    }

    compute_events_in_a_monthly_period(year, days_period) {
        for(const a_monthly_event of this.temp_monthly_event_partition) {
            this.monthly_event_partition(year, a_monthly_event.month, a_monthly_event.month)
            this.compute_events_in_periods_of_days_in_a_month(year, a_monthly_event.month, days_period)
        }
    }

    compute_events_in_a_yearly_span_and_days_period(category, start_year, end_year, days_period) {
        this.yearly_event_partition(category, start_year, end_year)
        for(const a_yearly_event of this.temp_yearly_event_partition) {
            this.monthly_event_partition(a_yearly_event.year, 1, 12)
            this.compute_events_in_a_monthly_period(a_yearly_event.year, days_period)
        }
    }

    compute_period_status_by_n_period_days_in_years(category, start_year, end_year, n_period_days) {
        this.partition_years(category, start_year, end_year)
        for(const a_yearly_event of this.temp_yearly_event_partition) {
            this.init_temp_period_status()
            this.temp_period_status.year = a_yearly_event.year
            this.partition_months(category,a_yearly_event.year, 1, 12)
            for(const a_monthly_event of this.temp_monthly_event_partition) {
                this.temp_period_status.month = a_monthly_event.month
                for(let day; day < 31; day = day + n_period_days) {
                    this.partition_days(category, a_yearly_event.year, a_monthly_event.month, day, day + n_period_days)
                    this.filter_events_from_daily_event_partition()
                    this.temp_solved_event_list = this.temp_event_list
                    this.solve_complete_of_all_events_in_a_period()
                    this.add_a_period_status_toOwnerStatus(this.temp_period_status)
                    this.temp_period_event_status.push(this.temp_period_status)
                }
            }
        } 
    }
}

export {ScheduledEvent, OwnerStatus, Ownership, JsonDataStruct};
// export default OwnerStatus;