import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    }
})

mongoose.model("Project", projectSchema);