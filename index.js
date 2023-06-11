const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.route")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(cors())

app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB!!");
    } catch (error) {
        console.log(error);
        console.log("Something went wrong while connecting to DB!!");
    }
    console.log(`Server is running on port ${process.env.port}`);
})