const express = require('express');
const users = require('../models/userSchema');
const router = express.Router();

//register users...
router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, address, description } = req.body;
    if (!name || !email || !age || !mobile || !work || !address || !description) {
        res.status(404).json("Plz fill the data");
    }
    try {
        const preuser = await users.findOne({ email: email })

        if (preuser) {
            return res.status(404).json("User alreay register")
        }
        const addUser = new users({
            name, email, age, mobile, work, address, description
        })

        await addUser.save();

        return res.status(200).json(addUser)
    }
    catch (error) {
        res.status(404).json(error)
    }
})

// get users...
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(200).json(userdata)
        console.log(userdata)
    } catch (error) {
        res.status(404).json(error);
    }
})

//get individual user ...
router.get("/getuser/:id", async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;
        const userindividual = await users.findById({ _id: id });
        console.log(userindividual);
        res.status(200).json(userindividual);
    } catch (error) {
        res.status(404).json(error);
    }
})

//update user data ...
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log("updated user");
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(404).json(error);
    }
})

//delete user ...
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await users.findByIdAndDelete({ _id: id });

        console.log("Delete user");
        res.status(200).json(deleteUser);

    } catch (error) {
        res.status(404).json(error);
    }
})
module.exports = router;

