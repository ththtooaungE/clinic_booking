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

    }

    static async delete(req, res) {
        try {
            const user = await User.deleteOne(req.params.id);

            console.log(user);
            
            return res.status(204).send({
                message: 'User Successfully deleted!'
            })
            
        } catch (error) {
            
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
}

module.exports = UserController;