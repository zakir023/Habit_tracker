const Habit = require('../models/habit');


/* ******************************************************************************************************************
fetch all the habits and show on home screen when page is loaded
API: localhost:8000/fetchAllOnLoad
******************************************************************************************************************* */
module.exports.home = function(req, res) {
    Habit.find({}, function(err, habits) {
        if(err) {
            console.log("Error in fetching habits from DB");
            return res.status(404).json({
                messgae: "Error in fetching habits from DB"
            });
        }

        // return res.status(200).json({
        //     message: 'Fetch success',
        //     habits: habits
        // });

        return res.render('home', {
            habit_list: habits
        })
    });
}


/* ******************************************************************************************************************
creating new habit when clicking on +create button
API: localhost:8000/habit/addNewHabit
******************************************************************************************************************* */
module.exports.addNewHabit = function(req, res) {
    req.body.record = {};
    console.log(req.body);

    Habit.create(req.body, function(err, newHabit) {
        if(err) {
            console.log("Error in creating new habits in DB");
            return res.status(404).json({
                messgae: "Error in creating new habits in DB"
            });
        }

        // return res.status(200).json({
        //     habit: newHabit
        // });

        return res.redirect("back");
    });
}


/* ******************************************************************************************************************
pass id in url as a query and delete the habit associated with given ID
API: localhost:8000/habit/deleteHabit?id=<ID OF THE HABIT>
******************************************************************************************************************* */
module.exports.deleteHabit = function(req, res) {
    let id = req.query.id;
    console.log('habit delete ID: ', id);

    Habit.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('Error while deleting the habit');
            return res.status(500).json({
                message: 'Error while deleting the habit'
            });
        }

        // return res.status(200).json({
        //     message: 'Deleted Successfully'
        // });

        return res.redirect("back");
    });


}


/* ******************************************************************************************************************
pass id in url as a query and fetch all the previous logged details of this habit and show on another page
API: localhost:8000/habit/viewHabit
******************************************************************************************************************* */
module.exports.viewHabit = function (req, res) {
    let id = req.query.id;
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("error in finding habit id: ", id);
            return res.status(200).json({
                message: `Error in finding habit id ${id}`
            });
        }
        else {
            // res.status(200).json({
            //     message: 'success',
            //     habit: habit
            // })

            console.log(habit);

            res.render("habit", { "habit": habit });
        }
    })
}


/* ******************************************************************************************************************
Finds a habit by id given in query params and returns it's json object
API: localhost:8000/habit/fetchHabit
******************************************************************************************************************* */
module.exports.fetchHabit = function (req, res) {
    let id = req.query.id;
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("error in finding habit id: ", id);
            return res.status(200).json({
                message: `Error in finding habit id ${id}`
            });
        }
        else {
            console.log(habit);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(habit));
        }
    });
}

/* ******************************************************************************************************************
Find the habit in DB using ID
Update habit with date and status of the present day
MAP => date(key) - status(value)
API: localhost:8000/habit/updateHabit
******************************************************************************************************************* */
module.exports.updateDbDate = function(req, res) {
    let id = req.query.id;
    let date = req.query.date;
    let value = req.query.value;

    console.log(id, date, value);

    Habit.findById(id, function(err, habit) {
        if(err) {
            console.log('error at finding habit ', err);
            return res.end('{"status": "failed}');
        }

        const record = habit.record;
        if(date in record) {

            //update value
            record[date] = value;
        }else {

            // add new 
            record.set(date, value);
        }

        console.log(record);

        Habit.updateOne({"_id": id}, {$set: {record: record}}, function(err) {
            if(err) {
                console.log("error in updating habit: ", err);
                return res.end('{"status" : "failed"}');
            }

            return res.end('{"status" : "success"}');
        });
    });
}