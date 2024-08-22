

class ScheduleController
{
    static async all (req, res) {
        try {
            const schedules = await Schedule.find({ doctor: req.params.doctorId });
            return res.send(schedules);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    static async store (req, res) {
        try {
            const doctorId = req.params.doctorId;

            const doctor = await Doctor.findById(doctorId);
            
            if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
            
    
            const schedule = new Schedule({
                doctor: doctorId,
                day: req.body.day,
                // start: new Date(`1970-01-01 ${req.body.start}`),
                // end: new Date(`1970-01-01 ${req.body.end}`)
                start: req.body.start,
                end: req.body.end
            });
    
            if(await schedule.save()) return res.send(await schedule.save());
            else res.status(500).json({message: "Something went wrong!"})
        } catch (error) {
            res.status(500).send({message: error.message});
        }
        
    }

    static async single (req, res) {
        try {
            const { doctorId, scheduleId } = req.params;
    
            if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(scheduleId)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
    
            const schedule = await Schedule.findOne({ 
                _id: req.params.scheduleId,
                doctor: req.params.doctorId
                })
                .populate('doctor');
    
            if (!schedule) return res.status(404).send({message: 'not found!'});
    
            return res.send(schedule);
        } catch (err) {
            return res.status(500).send({message: err.message});
        }
    }

    static async update (req, res) {
        try {
            const {doctorId, scheduleId} = req.params;
    
            if(!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(scheduleId))
                return res.status(400).send({message: 'Invalid ID format'});
    
            let schedule = await Schedule.findOne({ _id: scheduleId, doctor: doctorId });
            if (!schedule) return res.status(404).send({message: 'not found!'});
    
            schedule.day = req.body.day;
            schedule.start = req.body.start;
            schedule.end = req.body.end;
        
            if(await schedule.save()) return res.status(200).send(schedule);
            else throw Error('Something went wrong!');
            
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async delete (req, res) {
        try {
            const schedule = await Schedule.findById(req.params.scheduleId);

            if (!schedule) return res.status(404).send({message: 'not found!'});
                
            if(await schedule.deleteOne()) res.send({mesage: 'successfully deleted!'});
            else throw Error('Something went wrong!');

        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
}

module.exports = ScheduleController;