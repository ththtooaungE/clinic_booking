const express = require('express');
const route = express.Router();
const Middleware = require('../middleware/middleware');

const DoctorController = require('../controller/DoctorController');
const ScheduleController = require('../controller/ScheduleController');
const BookingController = require('../controller/BookingController');

route.get('/doctors',DoctorController.all);
route.post('/doctors',  Middleware.admin, DoctorController.store);
route.get('/doctors/:id', DoctorController.single);
route.put('/doctors/:id',  Middleware.admin, DoctorController.update);
route.delete('/doctors/:id',  Middleware.admin, DoctorController.delete);

route.get('/doctors/:doctorId/schedules', ScheduleController.all);
route.post('/doctors/:doctorId/schedules',  Middleware.admin, ScheduleController.store);
route.get('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.single);
route.put('/doctors/:doctorId/schedules/:scheduleId',  Middleware.admin, ScheduleController.update);
route.delete('/doctors/:doctorId/schedules/:scheduleId',  Middleware.admin, ScheduleController.delete);

route.get('/schedules/:scheduleId/bookings', BookingController.all);
route.post('/schedules/:scheduleId/bookings', BookingController.store);
route.get('/schedules/:scheduleId/bookings/:bookingId', BookingController.single);
route.put('/schedules/:scheduleId/bookings/:bookingId', BookingController.update);
route.delete('/schedules/:scheduleId/bookings/:bookingId', BookingController.delete);

module.exports = route;