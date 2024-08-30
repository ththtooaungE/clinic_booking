const Doctor = require('../models/doctor');

class DoctorController
{
    static async all(req, res) {
        try {
            let doctors = await Doctor.find();
            res.send(doctors);
        } catch(error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async store(req, res) {
        try {
            let doctor = new Doctor({
                name: req.body.name,
                title: req.body.title,
                specialty: req.body.specialty,
                experienceYear: req.body.experienceYear,
                price: req.body.price,
            });
                
            if(await doctor.save()) return res.send(doctor);
            else throw Error('Something went wrong!');
            
        } catch(error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async single(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.id);
            if(!doctor) return res.status(404).send({message: 'Doctor Not Found!'});

            return res.send(doctor);
        } catch(error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            let doctor = await Doctor.findById(req.params.id);
            if(!doctor) return res.status(404).send({message: 'Doctor Not Found!'});
            
            if (req.body.name !== undefined && req.body.name !== null) doctor.name = req.body.name;
            if (req.body.title !== undefined && req.body.title !== null) doctor.title = req.body.title;
            if (req.body.specialty !== undefined && req.body.specialty !== null) doctor.specialty = req.body.specialty;
            if (req.body.experienceYear !== undefined && req.body.experienceYear !== null) doctor.experienceYear = req.body.experienceYear;
            if (req.body.price !== undefined && req.body.price !== null) doctor.price = req.body.price;

            if (await doctor.save()) return res.status(200).send(doctor);
            else throw Error('Something went wrong!');
            
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.id);
            if(!doctor) return res.status(404).send({message: 'Doctor Not Found!'});
        
            if(await doctor.deleteOne()) return res.send({message: 'success'});
            else throw Error('Something went wrong!');

        } catch(error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = DoctorController;