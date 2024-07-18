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
    constructor() {
        this.base_id = 'appujfaklryoZZPxX';
        this.auth_token = 'Bearer pateZMV3GBMLUVnWA.53e93b721f80534560c6592cfa282c13e9c8079387c3b79d033cd39956ee7d71';
        this.obj_type = '';
        this._obj_id = null
        var Airtable = require('airtable');
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.auth_token
        });
        this.base = new Airtable({ apiKey: 'pateZMV3GBMLUVnWA.53e93b721f80534560c6592cfa282c13e9c8079387c3b79d033cd39956ee7d71' }).base('appujfaklryoZZPxX');
    }

    // typecheck that fields is a key value pair object
    // error check for same id in database
    async create(data) {
        return new Promise((resolve, reject) => {
            this.base(this.obj_type).create(data, function (err, record) {
                if (err) { reject(err); }
                else { resolve(record.getId()); }
            });
        });
    }

    async update() {
        return new Promise((resolve, reject) => {
            this.base(this.obj_type).find(this._obj_id, function (err, record) {
                if (err) { reject(err); }
                else { resolve(record); }
            });
        });
    }

    export(data) {
        this.base(this.obj_type).update([
            {
                "id": this._obj_id,
                "fields": data
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.get('Name'));
            });
        });
    }
}

class ScheduledEvent extends DatabaseObj {
    constructor(...args) {
        super();
        this.obj_type = 'ScheduledEvent';
        this._owner = null;
        this._name = null;
        this._year = null;
        this._month = null;
        this._day = null;
        this._start = null;
        this._hours = null;
        this._end = null;
        this._max = null;
        this._min = null;
        this._median = null;
        this._mode = null;
        if (args.length == 1) {
            this._obj_id = args[0];
            this.pullFromDB();
            return;
        }
    }

    get obj_id() { return this._obj_id; }

    get owner() { return this._owner; }

    get name() { return this._name; }

    get year() { return this._year; }

    get month() { return this._month; }

    get day() { return this._day; }

    get start() { return this._start; }

    get hours() { return this._hours; }

    get end() { return this._end; }

    get max() { return this._max; }

    get min() { return this._min; }

    get median() { return this._median; }

    get mode() { return this._mode; }

    set name(inputName) { this._name = inputName; }

    set owner(inputOwner) { this._owner = inputOwner; }

    set year(inputYear) { this._year = inputYear; }

    set month(inputMonth) { this._month = inputMonth; }

    set day(inputDay) { this._day = inputDay; }

    set start(inputStart) { this._start = inputStart; }

    set hours(inputHours) { this._hours = inputHours; }

    set end(inputEnd) { this._end = inputEnd; }

    set max(inputMax) { this._max = inputMax; }

    set min(inputMin) { this._min = inputMin; }

    set median(inputMedian) { this._median = inputMedian; }

    set mode(inputMode) { this._mode = inputMode; }

    async createDBEntry() {
        try {
            this._obj_id = await this.create(
                { ...this.exportToJson() }
            );
            console.log(this._obj_id)
        } catch (error) {
            console.error(error);
        }
    }

    async updateFromDB() {
        try {
            let imported_obj = await this.update(this._obj_id);
            this.name = imported_obj.fields.Name;
            this.owner = imported_obj.fields.Owner;
            this.year = imported_obj.fields.Year;
            this.month = imported_obj.fields.Month;
            this.day = imported_obj.fields.Day;
            this.start = imported_obj.fields.Start;
            this.hours = imported_obj.fields.Hours;
            this.end = imported_obj.fields.End;
            this.max = imported_obj.fields.Max;
            this.min = imported_obj.fields.Min;
            this.median = imported_obj.fields.Median;
            this.mode = imported_obj.fields.Mode;
        } catch (error) {
            console.error(error);
        }
    }

    exportToJson() {
        return {
            Name: this.name,
            Owner: this.owner,
            Year: this.year,
            Month: this.month,
            Day: this.day,
            Start: this.start,
            Hours: this.hours,
            End: this.end,
            Max: this.max,
            Min: this.min,
            Median: this.median,
            Mode: this.mode
        };
    }

    updateFromJson(json) {
        // json = JSON.parse(json);
        json = JSON.stringify(json);
        json = JSON.parse(json);
        if (json.name != null) { this._name = json.name; }
        if (json.owner != null) { this._owner = json.owner; }
        if (json.year != null) { this._year = json.year; }
        if (json.month != null) { this._month = json.month; }
        if (json.day != null) { this._day = json.day; }
        if (json.start != null) { this._start = json.start; }
        if (json.hours != null) { this._hours = json.hours; }
        if (json.end != null) { this._end = json.end; }
        if (json.max != null) { this._max = json.max; }
        if (json.min != null) { this._min = json.min; }
        if (json.median != null) { this._median = json.median; }
        if (json.mode != null) { this._mode = json.mode; }
    }

    exportToDB() {
        if (this._obj_id != null) {
            this.export(this.exportToJson());
        } else {
            this._obj_id = this.createDBEntry();
        }
    }
}

class User extends DatabaseObj {
    constructor(...args) {
        super();
        this.obj_type = 'User';
        this._username = null;
        this._name = null;
        this._password = null;
        if (args.length == 1) {
            this._obj_id = args[0];
            this.pullFromDB();
            return;
        }
    }

    get obj_id() { return this._obj_id; }

    get name() { return this._name; }

    get user_name() { return this._username; }

    get password() { return this._password; }

    set user_name(inputUserName) { this._username = inputUserName; }

    set name(inputName) { this._name = inputName; }

    set password(inputPassword) { this._password = inputPassword; }

    async createDBEntry() {
        try {
            this._obj_id = await this.create(
                { ...this.exportToJson() }
            );
            console.log(this._obj_id)
        } catch (error) {
            console.error(error);
        }
    }

    async updateFromDB() {
        try {
            let imported_obj = await this.update(this._obj_id);
            this.name = imported_obj.fields.Name;
            this.user_name = imported_obj.fields.Username;
            this.password = imported_obj.fields.Password;
        } catch (error) {
            console.error(error);
        }
    }

    exportToJson() {
        return {
            Name: this.name,
            Username: this.user_name,
            Password: this.password
        };
    }

    importFromJson(json) {
        // json = JSON.parse(json);
        json = JSON.stringify(json);
        json = JSON.parse(json);
        if (json.name != null) { this.name = json.name; }
        if (json.username != null) { this.user_name = json.username; }
        if (json.password != null) { this.password = json.password; }
    }

    exportToDB() {
        if (this._obj_id != null) {
            this.export(this.exportToJson());
        } else {
            this._obj_id = this.createDBEntry();
        }
    }

    nonExistingUsername(username) {
        this.base('User').select({
            maxRecords: 1,
            // filterByFormula: "{Username} = " + username,
            filterByFormula: `{Username} = '${username}'`,
            view: "Grid view"
        }).eachPage(function page(records) {
            records.forEach(function (record) {
                // console.log(record)
                return record.get('Username')
            });
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        return True
    }

    async logIn(username) {
        let doesntExist = nonExistingUsername(username)
        await new Promise(r => setTimeout(r, 2000));
        // IF USER DOESN'T EXIST
        this._username = username
        if (doesntExist) {
            let new_user = new Ownership()
            new_user.username = username
            new_user.createDBEntry()
            return []
        } else {
            let events = []
            this.base('ScheduledEvent').select({
                // filterByFormula: "{Owner} = " + username,
                filterByFormula: `{Owner} = '${username}'`,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    // console.log(record)
                    events.push(record.fields)
                });
                fetchNextPage();

            }, function done(err) {
                if (err) { console.error(err); return; }
            });
            return events
        }
    }
}

export { ScheduledEvent, User };
// export default OwnerStatus;

// async function test() {
// NOTE: DEMONSTRATING LOG IN FUNCTION
// test_user = new Ownership
// events = await test_user.logIn('Angel')
// await new Promise(r => setTimeout(r, 2000));
// console.log(events)
// test_user2 = new Ownership
// let test_user2_name = test_user2.logIn('Paolo')
// await new Promise(r => setTimeout(r, 2000));
// console.log(test_user2_name)

// NOTE: CREATING SCHEDULED EVENT EXAMPLE
// test_event = new ScheduledEvent("test", '2021', '12', '12', '12', '12', '12', '12', '12', '12', '12')
// test_event.createDBEntry()
// await new Promise(r => setTimeout(r, 2000));
// // console.log(test_event.obj_id)
// console.log(test_event)
// test_event.updateFromJson({
//     year: "912837",
//     month: "11"
// })
// console.log(test_event)
// test_event.exportToDB()
// new_event = new ScheduledEvent(test_event.obj_id)
// console.log(new_event)
// }
