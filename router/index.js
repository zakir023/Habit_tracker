const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habitController'); // get controller reference

router.get('/', habitController.home); // render the page on load -> get all habit list
router.post('/addNewHabit', habitController.addNewHabit); // add a new habit in DB
router.get('/deleteHabit', habitController.deleteHabit); // delete a perticular habit in DB, ID provided as a query
router.get('/viewHabit', habitController.viewHabit); // view a perticular habit in habit.ejs page with habit details, ID is provided as a query
router.get('/fetchHabit', habitController.fetchHabit); // fetch the details of the habit as a json data
router.get('/updateDbDate', habitController.updateDbDate); // update the habit details for a perticular date with specific status

module.exports = router;