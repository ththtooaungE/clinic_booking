const express = require('express');
const route = express.Router();

const DoctorController = require('../controller/DoctorController');
const ScheduleController = require('../controller/ScheduleController');

route.get('/doctors', DoctorController.all);
route.post('/doctors', DoctorController.store);
route.get('/doctors/:id', DoctorController.single);
route.put('/doctors/:id', DoctorController.update);
route.delete('/doctors/:id', DoctorController.delete);

route.get('/doctors/:doctorId/schedules', ScheduleController.all);
route.post('/doctors/:doctorId/schedules', ScheduleController.store);
route.get('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.single);
route.put('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.update);
route.delete('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.delete);

module.exports = route;