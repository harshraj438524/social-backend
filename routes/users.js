const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const User = require('../modals/UserSchema');


// update user
router.put("/:id", async (req, res) => {

    if (req.params.id === req.body._id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                var salt = await bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hashSync(req.body.password, salt);
            }
            catch (e) {
                console.log(e);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.send(user);

        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(401).send("you can only update your own id");
    }
})


//delete user

router.delete("/:id", async (req, res) => {
    if (req.params.id === req.body._id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.send("deleted");
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(401).send("you can only deleet your own account");
    }
})


//get user
router.get("/:id", async (req, res) => {

        try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);

        } catch (error) {
            console.log(error);
        }

})

// get all user


router.get("/", async (req, res) => {

    // if (req.params.id === req.body._id || req.body.isAdmin) {

        try {
            const user = await User.find();
            const { password, updatedAt, ...other } = user;
            res.status(200).json(other);

        } catch (error) {
            console.log(error);
        }
    // }
    // else {
    //     res.status(401).send("you can only get your own account");
    // }
})


// follower

router.put('/:id/follow', async (req, res) => {
    if (req.params.id !== req.body._id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body._id);
        

            console.log((currUser));
            if (!user.followers.includes(req.body._id)) {
                await user.updateOne({$push:{followers:req.body._id}});
                await user.updateOne({$push:{followings:req.body._id}});
               
                res.status(200).send("user has been followed");
            }
            else{
                res.status(401).send("user already follow");
            }
        } catch (error) {
            res.send(error);

        }
    }
    else {
        res.status(401).send("you cannot follow youself");
    }
})

//unfollow

router.put('/:id/unfollow', async (req, res) => {
    if (req.params.id !== req.body._id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body._id);
            if (user.followers.includes(req.body._id)) {
                await user.updateOne({$pull:{followers:req.body._id}});
                await currUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).send("user has been unfollowed");
            }
            else{
                res.status(401).send("you are not following this user");
            }
        } catch (error) {

        }
    }
    else {
        res.status(401).send("you cannot unfollow youself");
    }
})

module.exports = router
