const express = require('express');
const userModel = require('../models/user');
const router = express.Router();

router.post("/register", async (req, res) => {
    const newUser = new userModel(req.body);

    try {
        const user = await newUser.save();
        return res.status(201).send('User Registered Successfully...');

    } catch (error) {
        return res.status(404).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email, password: password });

        if (user) {
            // console.log(user)
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            return res.send(temp);
            // return res.status(201).send('User Logedin Successfully...', user); //error
        } else {
            return res.status(400).send('Login faield');
        }
    } catch (error) {
        return res.status(404).send(error);
    }
});

//////----------------------------
router.get("/getallusers", async (req, res) => {

    try {
        const users = await userModel.find();
        
        res.status(200).send(users);

    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;



