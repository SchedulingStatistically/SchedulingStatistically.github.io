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
class DatabaseObj {
    //TODO: create separate pages for each item
    //TODO: update from db on each property
    constructor() {
        this.base_id = 'appujfaklryoZZPxX';
        this.table_id = 'tbldyaC9etrTA5Zpd/viwVlkMTPXKsRYYKv';
        this.auth_token = 'pateZMV3GBMLUVnWA.53e93b721f80534560c6592cfa282c13e9c8079387c3b79d033cd39956ee7d71';
        this.user_id = null
        this.fields
    }

    // typecheck that fields is a key value pair object
    // error check for same id in database
    create_db_entry(data) {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'post',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
        this.user_id = reponse.records.id
    }

    // DATABSE FUNCTIONS
    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify(this.fields)
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.fields["name"]
                this.ownership = data.fields["ownership"]
                this.owner_status = data.fields["owner_status"]
                this.scheduled_events = data.fields["scheduled_events"]
            })
    }
}
class ScheduledEvents extends DatabaseObj {
    constructor(year, month, day, an_event, start, hours, end) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.an_event = an_event;
        this.start = start;
        this.hours = hours;
        this.end = end;
        this.create_db_entry({
            "fields": {
                "Year": year,
                "Month": month,
                "Day": day,
                "An_Event": an_event,
                "Start": start,
                "Hours": hours,
                "End": end
            }
        })
    }

    toJsonFormat() {
        return {
            year: this.year,
            month: this.month,
            day: this.day,
            an_event: this.an_event,
            start: this.start,
            hours: this.hours,
            end: this.end,
        };
    }

    static fromJsonFormat(json) {
        return new ScheduledEvents(json.year, json.month, json.day, json.an_event, json.start, json.hours, json.end);
    }

    // DATABSE FUNCTIONS
    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify({
                "fields": {
                    "Year": this.year,
                    "Month": this.month,
                    "Day": this.day,
                    "An_Event": this.an_event,
                    "Start": this.start,
                    "Hours": this.hours,
                    "End": this.end
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                this.year = data.records.fields["Year"]
                this.month = data.records.fields["Month"]
                this.day = data.records.fields("Day")
                this.an_event = data.records.fields("An_Event")
                this.start = data.records.fields("Start")
                this.hours = data.records.fields("Hours")
                this.end = data.records.fields("End")
            })
    }
}

class EventStatus extends DatabaseObj {
    constructor(an_event, max, min, median, mode) {
        this.an_event = an_event;
        this.max = max;
        this.min = min;
        this.median = median;
        this.mode = mode;
        this.create_db_entry({
            "fields": {
                "An_Event": an_event,
                "Max": max,
                "Min": min,
                "Median": median,
                "Mode": mode
            }
        })
    }

    toJsonFormat() {
        return {
            an_event: this.an_event,
            max: this.max,
            min: this.min,
            median: this.median,
            mode: this.mode
        }
    }

    static fromJsonFormat(json) {
        return new EventStatus(json.an_event, json.max, json.min, json.median, json.mode)
    }

    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify({
                "fields": {
                    "Year": this.year,
                    "Month": this.month,
                    "Day": this.day,
                    "An_Event": this.an_event,
                    "Start": this.start,
                    "Hours": this.hours,
                    "End": this.end
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.fields["name"]
                this.ownership = data.fields["ownership"]
                this.owner_status = data.fields["owner_status"]
                this.scheduled_events = data.fields["scheduled_events"]
            })
    }
}

class OwnerStatus extends DatabaseObj {
    constructor(global_status, current_status_scope, hobby_status) {
        this.your_global_status = global_status;
        this.current_status_scope = current_status_scope;
        this.all_event_status = hobby_status;
        this.create_db_entry({
            "fields": {
                "Global_Status": global_status,
                "Current_Status_Scope": current_status_scope,
                "Hobby_Status": hobby_status
            }
        })
    }

    toJsonFormat() {
        return {
            your_global_status: this.your_global_status,
            current_status_scope: this.current_status_scope,
            all_event_status: this.all_event_status.map(hobby_status => hobby_status.toJsonFormat()),
        };
    }

    static fromJsonFormat(json) {
        const all_event_status = json.all_event_status.map(hobby_status => EventStatus.fromJsonFormat(hobby_status));
        return new OwnerStatus(json.your_global_status, json.current_status_scope, all_event_status);
    }

    addEvent_status(new_event) {
        this.all_event_status.push(new EventStatus(new_event.an_event, new_event.max, new_event.min, new_event.median, new_event.mode));
    }

    removeEvent_status(new_event) {
        this.all_event_status.pop()
    }

    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify({
                "fields": {
                    "Year": this.year,
                    "Month": this.month,
                    "Day": this.day,
                    "An_Event": this.an_event,
                    "Start": this.start,
                    "Hours": this.hours,
                    "End": this.end
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.fields["name"]
                this.ownership = data.fields["ownership"]
                this.owner_status = data.fields["owner_status"]
                this.scheduled_events = data.fields["scheduled_events"]
            })
    }
}

class Ownership extends DatabaseObj {
    constructor(name, user_name, password) {
        this.name = name;
        this.user_name = user_name;
        this.password = password;
        this.create_db_entry({
            "fields": {
                "Name": name,
                "Username": user_name,
                "Password": password
            }
        })
    }

    toJsonFormat() {
        return {
            name: this.name,
            user_name: this.user_name,
            password: this.password,
        };
    }

    static fromJsonFormat(json) {
        return new Ownership(json.name, json.user_name, json.password);
    }

    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify({
                "fields": {
                    "Name": this.name,
                    "Username": this.user_name,
                    "Password": this.password
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.fields["Name"]
                this.name = data.fields["Username"]
                this.name = data.fields["Password"]
            })
    }
}


class JsonDataStruct {
    constructor(name, ownership, owner_status, scheduled_events) {
        this.name = name;
        this.ownership = ownership;
        this.owner_status = owner_status;
        this.scheduled_events = scheduled_events;
        this.create_db_entry({
            "fields": {
                "Name": this.name,
                "Ownership": this.ownership,
                "Owner_Status": this.owner_status,
                "Scheduled_Events": this.scheduled_events
            }
        })
    }

    toJsonFormat() {
        return {
            name: this.name,
            ownership: this.ownership.toJsonFormat(),
            owner_status: this.owner_status.toJsonFormat(),
            scheduled_events: this.scheduled_events.map(an_event => an_event.toJsonFormat()),
        };
    }

    static fromJsonFormat(json) {
        const ownership = Ownership.fromJsonFormat(json.ownership);
        const owner_status = OwnerStatus.fromJsonFormat(json.owner_status);
        const scheduled_events = json.scheduled_events.map(an_event => ScheduledEvents.fromJsonFormat(an_event));
        return new JsonDataStruct(json.name, ownership, owner_status, scheduled_events);
    }

    getName() {
        this.update_from_db()
        return this.name;
    }

    updateName(newName) {
        this.name = newName;
        this.send_to_db("name", newName, this.user_id)
    }

    getOwnership() {
        this.update_from_db()
        return this.ownership;
    }

    updateOwnership(newOwnership) {
        // TODO: maybe make it so that it doesn't have to create a new object
        this.ownership = Ownership.fromJsonFormat(newOwnership);
    }

    get getOwner_status() {
        return this.owner_status;
    }

    addEvent_ToOwnerStatus(new_event) {
        this.owner_status.addEvent_status(new_event);
    }

    removeEvent_fromOwnerStatus() {
        this.owner_status.removeEvent_status();
    }

    getEvent_status() {
        return this.owner_status.toJsonFormat()
    }

    updateOwner_status(newOwner_status) {
        this.owner_status = OwnerStatus.fromJsonFormat(newOwner_status)
        // this.owner_status = new OwnerStatus(newOwner_status.your_global_status, newOwner_status.current_status_scope, newOwner_status.all_event_status);
    }

    getScheduled_events() {
        return this.scheduled_events;
    }

    addScheduled_event(event) {
        this.scheduled_events.push(new ScheduledEvents(event.year, event.month, event.day, event.an_event, event.start, event.hours, event.end))
    }

    removeScheduled_event() {
        //  TODO: add ability to delete events instead of being a stack
        this.scheduled_events.pop()
    }

    updateScheduled_events(newScheduled_events) {
        this.scheduled_events = newScheduled_events.map(event => new ScheduledEvents(event.year, event.month, event.day, event.an_event, event.start, event.hours, event.end));
    }

    send_to_db() {
        //TODO: add typechecking and error handling
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'patch',
            headers: {
                'authorization': this.auth_token,
                'content-type': 'application/json'
            },
            body: json.stringify({
                "fields": {
                    "Name": this.name,
                    "Ownership": this.ownership,
                    "Owner_Status": this.owner_status,
                    "Scheduled_Events": this.scheduled_events
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('error:', error);
        // });
    }

    update_from_db() {
        fetch(`https://api.airtable.com/v0/${this.base_id}/
            ${this.table_id}/${this.user_id}`, {
            method: 'get',
            headers: {
                'authorization': auth_token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.fields["name"]
                this.ownership = data.fields["ownership"]
                this.owner_status = data.fields["owner_status"]
                this.scheduled_events = data.fields["scheduled_events"]
            })
    }

    /*
        FUNCTION BELLOW ARE FOR FILTERING JSON ARRAYS
        THE INTENT IT TO MAKE A PIPELINE TO PROCESS DATA WITH ARRAY
        FOR EXAMPLE LIST.REDUCE(LIST.MAP(NAME) + NAME)
    */
}

export { ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct };
// export default OwnerStatus;
