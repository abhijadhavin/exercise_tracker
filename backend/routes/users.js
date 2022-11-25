import express from 'express';
import User from '../models/user.model.js'

var router = express.Router();

router.get('/', (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err=> res.status(400).json('Error: '+ err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
     .then(() => res.status(203).json("User added!"))
     .catch((err) => res.status(400).json('Error: '+  err));
})

// ..stuff below
export default router;
