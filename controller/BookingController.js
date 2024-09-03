const Booking = require("../models/booking");
const Schedule = require("../models/schedule");
const SuspensationRecord = require("../models/suspensation-records");
const User = require("../models/user");

class BookingController
{
    static async all(req, res) {
        try {
            const bookings = await Booking.find({schedule: req.params.scheduleId});
            return res.status(200).send({
                message: 'Successfully retrieved!',
                data: bookings
            });

        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async store(req, res) {
        try {
            if (!await Schedule.findById(req.params.scheduleId)) {
                return res.status(404).send({message: 'Schedule Not Found!'});
            }

            const user = await User.findById(req.user.id);
            if(user.suspensationUntil > new Date(new Date().toISOString())) {
                return res.status(403).send({
                    message: 'You are suspended! Please Contact Admin!'
                    });
            }
                

            const count = await Booking.countDocuments({schedule: req.params.scheduleId});

            const booking = new Booking({
                schedule: req.params.scheduleId,
                user: req.user.id,
                name: req.body.name,
                age: req.body.age,
                note: req.body.note,
                token: count+1
            });
    
            if(await booking.save()) 
                return res.status(201).send({message: 'Successfully created!', data:booking});
            else
                throw Error('Something went wrong'); 
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async single(req, res) {
        try {
            const booking = await Booking.findOne({ _id: req.params.bookingId, schedule: req.params.scheduleId});
            
            if(!booking) return res.status(404).send({message: 'Not found!'});
            else return res.status(200).send({message: 'Successfully retrieved!', data: booking});
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async update(req, res) {
        try {
            const booking = await Booking.findOne({ _id: req.params.bookingId, schedule: req.params.scheduleId});
            if(!booking) return res.status(404).send({message: 'Not found!'});

            if(req.body.name !== undefined && req.body.name !== null) booking.name = req.body.name;
            if(req.body.age !== undefined && req.body.age !== null) booking.age = req.body.age;
            if(req.body.note !== undefined && req.body.note !== null) booking.note = req.body.note;
            if(req.body.status !== undefined && req.body.status !== null) booking.status = req.body.status;

            if (await booking.save()) {
                return res.status(200).send({message: 'Successfully updated!', data: booking});
            } else {
                throw Error('Something went wrong!');
            }

        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async delete(req, res) {
        try {
            const booking = await Booking.findOne({ _id: req.params.bookingId, schedule: req.params.scheduleId});
            if(!booking) return res.status(404).send({message: 'Not found!'});

            if(await booking.deleteOne()) return res.status(204).send({message: 'Successfully deleted!'});
            else return res.status(500).send({message: 'Something went wrong!'});

        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async updateStatus(req, res) {
        try {
            const booking = await Booking.findOne({ _id: req.params.bookingId});
            if(!booking) return res.status(404).send({message: 'Booking Not found!'});

            if(req.body.status === 'cancelled' || req.body.status === 'failed') {
                
                const user = await User.findById(booking.user);
                user.cancellationCount = user.cancellationCount + 1;
                
                console.log(user.cancellationCount);
                
                if(user.cancellationCount === 3) {
                    console.log('=3 is working');
                    
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = date.getMonth();  // Months are 0-based in JavaScript
                    const day = date.getDate();
                    const hour = date.getHours();
                    const minute = date.getMinutes();

                    // Use individual components to avoid UTC conversion
                    user.suspensationUntil = new Date(year, month, (day + 3), hour, minute); // gets ISO date
                } else if (user.cancellationCount > 3 && user.suspensationUntil < new Date(new Date().toISOString())) {
                    console.log('=4 is working');
                    user.cancellationCount = 1;
                    const suspensationRecord = new SuspensationRecord({
                        user: req.user.id,
                        suspensationUntil: user.suspensationUntil,
                        createdAt: new Date()
                    });
                    await suspensationRecord.save();
                }
                await user.save(); // do we need to use save
            }

            booking.status = req.body.status;

            if(await booking.save()) return res.status(204).send({message: 'Status successfully updated!'});
            else return res.status(500).send({message: 'Something went wrong!'});
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async userBookings(req, res) {
        try {
            const bookings = await Booking.find({ user: req.params.userId});

            if(!bookings) return res.status(404).send({message: 'Not found!'});

            return res.status(200).send({
                message: 'Successfully retrieved!', 
                data: bookings
            });
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}

module.exports = BookingController;