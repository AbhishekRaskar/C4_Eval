const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { postRouter } = require("./Routes/post.route");


require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.get("/", (req, res) => {
    res.send("Home Route")
})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB");
        console.log(`Server is running at PORT ${process.env.port}`);
    } catch (error) {
        console.log(error)
        console.log("Something Went Wrong")
    }
})