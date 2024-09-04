const User = require('../models/user');

class UserController
{
    static async all(req, res) {
        try {
            const users = await User.find();
            return res.status(200).send({
                message: 'Users Successfully retrieved!',
                data: users
            })
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async show(req, res) {
        try {
            const user = await User.findById(req.params.id);

            return res.status(200).send({
                message: 'User Successfully retrieved!',
                data: user
            });

        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async update(req, res){
        try {
            const user = await User.findById(req.user.id);

            if(!user) return res.status(500).send({message: 'Something went wrong!'});

            if(req.body.name !== undefined && req.body.name !== null) user.name = req.body.name;
            if(req.body.username !== undefined && req.body.username !== null) user.username = req.body.username;
            if(req.body.email !== undefined && req.body.email !== null) user.email = req.body.email;
            if(req.body.phone !== undefined && req.body.phone !== null) user.phone = req.body.phone;
            if(req.body.city !== undefined && req.body.city !== null) user.city = req.body.city;
            if(req.body.country !== undefined && req.body.country !== null) user.country = req.body.country;
            if(req.body.birthday !== undefined && req.body.birthday !== null) user.birthday = req.body.birthday;

            if(await user.save()) return res.status(204).send({message: 'Profile Successfully updated!'});
            else return req.status(500).send({message: 'Something went wrong!'});

        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async delete(req, res) {
        try {
            const user = await User.deleteOne(req.params.id);

            console.log(user);
            
            return res.status(204).send({
                message: 'User Successfully deleted!'
            })
            
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async profile(req, res) {
        try {
            const user = await User.findById(req.user.id);

            return res.status(200).send({
                message: 'Profile Successfully retrieved!',
                data: user
            }); 
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    static async updateSuspensationUntil(req, res) {
        try {
            const user = await User.findById(req.params.id);            
            user.suspensationUntil = req.body.suspensationUntil;

            if(await user.save()) {
                return res.status(204).send({
                    message: 'Suspensation Successfully updated'
                });
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}

module.exports = UserController;