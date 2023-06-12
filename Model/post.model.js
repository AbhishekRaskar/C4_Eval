const mongoose = require("mongoose");

// schema
const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    device: { type: String, enum: ["Laptop", "Tablet", "Mobile"], require: true },
    no_of_comments: Number,
    userId: String,
    name: String
}, {
    versionKey: false
})

// model 
const PostModel = mongoose.model("post", PostSchema)


module.exports = {
    PostModel
}
