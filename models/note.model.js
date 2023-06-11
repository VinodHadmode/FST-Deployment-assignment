const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    user:String,
    category:String
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}