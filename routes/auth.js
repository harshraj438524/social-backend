const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const user = require('../modals/UserSchema');

router.post("/register", async (req, res) => {
    try {
        var salt = await bcrypt.genSaltSync(10);
        var hpassword = await bcrypt.hashSync(req.body.password, salt);
        const User = await new user({
            username: req.body.username,
            email: req.body.email,
            password: hpassword,
            isAdmin:true,
            
        })
        await User.save();
        res.status(200).send(User);
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const Users = await user.findOne({ email: req.body.email });
        if (!Users) {
            res.status(401).send("user not Exist");
        }
        else {
            const validpassword = await bcrypt.compare(req.body.password, Users.password);
            if (!validpassword) {
                res.status(401).send("invalid credentials");
            }
            else {
                res.status(200).send("login successfully");
            }
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router