const express = require('express');
const route = express.Router();
const Middleware = require('../middleware/middleware');

const DoctorController = require('../controller/DoctorController');
const ScheduleController = require('../controller/ScheduleController');
const BookingController = require('../controller/BookingController');
const UserController = require('../controller/UserController');
const ScheduleValidation = require('../validation/ScheduleValidation');
const DoctorValidation = require('../validation/DoctorValidation');
const BookingValidation = require('../validation/BookingValidation');

route.get('/doctors',DoctorController.all);
route.post('/doctors', DoctorValidation.store, Middleware.admin, DoctorController.store);
route.get('/doctors/:id', DoctorController.single);
route.put('/doctors/:id', DoctorValidation.update,  Middleware.admin, DoctorController.update);
route.delete('/doctors/:id',  Middleware.admin, DoctorController.delete);

route.get('/doctors/:doctorId/schedules', ScheduleController.all);
route.post('/doctors/:doctorId/schedules',  Middleware.admin, ScheduleValidation.store, ScheduleController.store);
route.get('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.single);
route.put('/doctors/:doctorId/schedules/:scheduleId',  Middleware.admin, ScheduleValidation.update, ScheduleController.update);
route.delete('/doctors/:doctorId/schedules/:scheduleId',  Middleware.admin, ScheduleController.delete);

route.get('/schedules/:scheduleId/bookings', BookingController.all);
route.post('/schedules/:scheduleId/bookings', BookingValidation.store, BookingController.store);
route.get('/schedules/:scheduleId/bookings/:bookingId', BookingController.single);
route.put('/schedules/:scheduleId/bookings/:bookingId', BookingValidation.update, BookingController.update);
route.delete('/schedules/:scheduleId/bookings/:bookingId', BookingController.delete);

route.put('/bookings/:bookingId/update-status', BookingController.updateStatus);
route.get('/users/:userId/bookings', BookingController.userBookings);

route.get('/users', UserController.all);
route.get('/users/:id', UserController.show);

module.exports = route;