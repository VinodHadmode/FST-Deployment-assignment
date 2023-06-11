const express = require("express")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
                res.json({ msg: "New user has been added" })
            } else {
                res.json({err:err})
            }
        })

    } catch (error) {
        res.json({ error: error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass,  (err, result) =>{
                if (result) {
                    const token=jwt.sign({userID:user._id,user:user.name},process.env.secret)
                    res.json({ msg: "Successfully Logged In!!",token:token })
                } else {
                    res.json({ msg: "Wrong Credentials." })
                }
            });

        } else {
            res.json({ msg: "User not found." })
        }

    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = {
    userRouter
}