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

// Doctors
route.get('/doctors/doctor-profile', DoctorController.profile);
route.get('/doctors',DoctorController.all);
route.post('/doctors', DoctorValidation.store, Middleware.doctor, DoctorController.store);
route.get('/doctors/:id', DoctorController.single);
route.put('/doctors/:id', DoctorValidation.update, DoctorController.update);
route.delete('/doctors/:id',  Middleware.admin, DoctorController.delete);

// Schedules
route.get('/doctors/:doctorId/schedules', ScheduleController.all);
route.post('/doctors/:doctorId/schedules',  Middleware.adminOrDoctor, ScheduleValidation.store, ScheduleController.store);
route.get('/doctors/:doctorId/schedules/:scheduleId', ScheduleController.single);
route.put('/doctors/:doctorId/schedules/:scheduleId',  Middleware.adminOrDoctor, ScheduleValidation.update, ScheduleController.update);
route.delete('/doctors/:doctorId/schedules/:scheduleId',  Middleware.adminOrDoctor, ScheduleController.delete);

// Bookings
route.get('/schedules/:scheduleId/bookings', BookingController.all);
route.post('/schedules/:scheduleId/bookings', BookingValidation.store, BookingController.store);
route.get('/schedules/:scheduleId/bookings/:bookingId', BookingController.single);
route.put('/schedules/:scheduleId/bookings/:bookingId', BookingValidation.update, BookingController.update);
route.delete('/schedules/:scheduleId/bookings/:bookingId', BookingController.delete);

route.put('/bookings/:bookingId/update-status', BookingController.updateStatus);
route.get('/users/:userId/bookings', BookingController.userBookings);

// Users
route.get('/users', Middleware.admin, UserController.all);
route.get('/users/:id', Middleware.admin, UserController.show);
route.get('/users/profile');

module.exports = route;