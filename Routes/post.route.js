
const express = require("express")
const { auth } = require("../Middleware/auth.middleware")
const { PostModel } = require("../Model/post.model")

const postRouter = express.Router()

postRouter.use(auth)



// create
postRouter.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body)
        await post.save();
        res.status(200).json({ msg: `A new has post has been created by ${req.body.name}` })
    } catch (error) {
        // res.status(400).json({ error: error.message })
        res.send("{ error: error.message }")
    }
})


// get
postRouter.get("/", async (req, res) => {
    const { userid } = req.body
    const { device } = req.query
    let obj = {}
    if (userid) {
        obj.userid = userid
    }

    if (device) {
        obj.device = device
    }

    try {
        const notes = await PostModel.find(obj)
        if (notes) {
            res.status(200).send({ "msg": notes })
        } else {
            res.status(200).send({ "msg": `Notes not found` })
        }



    } catch (er) {
        res.send(er.message)
    }
})




// update
postRouter.patch("/update/:postId", async (req, res) => {
    const { postId } = req.params
    const posts = await PostModel.findOne({ _id: postId })
    try {
        if (req.body.userId !== posts.userId) {
            res.status(200).send({ "msg": "You are not authorized Person" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: postId }, req.body)
            res.status(200).send({ "msg": "Data Updated Successfully" })       
        }     
    } catch (er) {
        res.status(400).send({ "msg": er.message })
    }
})


// delete
postRouter.delete("/delete/:postId", async (req, res) => {
    const { postId } = req.params
    const posts = await PostModel.findOne({ _id: postId })
    try {
        if (req.body.userId !== posts.userId) {
            res.status(200).send({ "msg": "You are not authorized Person" })
        } else {
            await PostModel.findByIdAndDelete({ _id: postId }, req.body)
            res.status(200).send({ "msg": "Data Deleted Successfully" })
        }
    } 
    
    catch (er) {
        res.status(400).send({ "msg": er.message })
    }
})
module.exports = {
    postRouter
}