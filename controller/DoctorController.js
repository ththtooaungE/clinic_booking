const Doctor = require('../models/doctors');

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
                speciality: req.body.speciality,
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


            doctor.name = req.body.name;
            doctor.title = req.body.title;
            doctor.speciality = req.body.speciality;
            doctor.experienceYear = req.body.experienceYear;
            doctor.price = req.body.price;
    
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