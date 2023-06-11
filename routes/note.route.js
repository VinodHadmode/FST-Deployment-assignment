const express = require("express")
const { NoteModel } = require("../models/note.model")
const { auth } = require("../middleware/auth.middleware")

const noteRouter = express.Router()

noteRouter.post("/create", auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.json({ msg: "New note has been created!" })

    } catch (error) {
        res.json({ error: error.message })
    }
})

noteRouter.get("/", auth, async (req, res) => {
    try {
        const notes = await NoteModel.find({ userID: req.body.userID })
        res.send(notes)

    } catch (error) {
        res.json({ error: error.message })
    }
})

//update route
noteRouter.patch("/update/:noteID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params

    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc == userIDinNoteDoc) {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.json({ msg: "Note has been updated", Note: req.body })
        } else {
            res.json({ msg: "Not authoriZed" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }

})

//delete
noteRouter.delete("/delete/:noteID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params

    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc == userIDinNoteDoc) {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.json({ msg: "Note has been deleted", Note: note })
        } else {
            res.json({ msg: "Not authoriZed" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }

})


module.exports = {
    noteRouter
}