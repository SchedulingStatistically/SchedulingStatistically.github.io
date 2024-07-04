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

class ScheduledEvents {
    constructor(year, month, day, hobby, start, hours, end) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hobby = hobby;
        this.start = start;
        this.hours = hours;
        this.end = end;
    }

    toJsonFormat() {
        return {
            year : this.year,
            month : this.month,
            day : this.day,
            hobby : this.hobby,
            start : this.start,
            hours : this.hours,
            end : this.end,
        };
    }

    static fromJsonFormat(json) {
        return new ScheduledEvents(json.year, json.month, json.day, json.hobby, json.start, json.hours, json.end);
    }
}

class HobbyStatus {
    constructor(hobby, max, min, median, mode) {
        this.hobby = hobby;
        this.max = max;
        this.min = min;
        this.median = median;
        this.mode = mode;
    }

    toJsonFormat() {
        return {
            hobby : this.hobby,
            max : this.max,
            min : this.min,
            median : this.median,
            mode : this.mode
        }
    }

    static fromJsonFormat(json) {
        return new HobbyStatus(json.hobby, json.max, json.min, json.median, json.mode)
    }
}

class OwnerStatus {
    constructor(global_status, current_status_scope, hobby_status) {
        this.your_global_status = global_status;
        this.current_status_scope = current_status_scope;
        this.your_hobby_status = hobby_status;
    }

    toJsonFormat() {
        return {
            your_global_status : this.your_global_status,
            current_status_scope : this.current_status_scope,
            your_hobby_status : this.your_hobby_status.map(hobby_status => hobby_status.toJsonFormat()),
        };
    }

    static fromJsonFormat(json) {
        const your_hobby_status = json.your_hobby_status.map(hobby_status => HobbyStatus.fromJsonFormat(hobby_status)) 
        return new OwnerStatus(json.your_global_status, json.current_status_scope, your_hobby_status);
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
        const scheduled_events = json.scheduled_events.map(an_event => ScheduledEvents.fromJsonFormat(an_event));
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
        this.ownership = new Ownership(newOwnership.name, newOwnership.user_name, newOwnership.password);
    }

    // get getOwner_status(){
    //     return this.owner_status;
    // }

    // updateOwner_status(newOwner_status){
    //     this.owner_status = new OwnerStatus(newOwner_status.max, newOwner_status.min, newOwner_status.median, newOwner_status.mode);
    // }

    getScheduled_events(){
        return this.scheduled_events;
    }

    addScheduled_event(event){
        this.scheduled_events.push(new ScheduledEvents(event.year, event.month, event.day, event.hobby, event.start, event.hours, event.end))
    }

    removeScheduled_event(){
        this.scheduled_events.pop()
    }

    updateScheduled_events(newScheduled_events){
        this.scheduled_events = newScheduled_events.map(event => new ScheduledEvents(event.year, event.month, event.day, event.hobby, event.start, event.hours,event.end));
    }


}

export {ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct};
// export default OwnerStatus;