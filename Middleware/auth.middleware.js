const jwt = require("jsonwebtoken");

require("dotenv").config();


const auth = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret)
            console.log(decoded);
            if (decoded) {
                req.body.userId = decoded.userId
                req.body.name = decoded.name
                next()
            }
            else {
                res.json({ msg: "Not Authorized" })
            }
        } catch (error) {
            res.json({ error: error.message })

        }
    }
    else {
        res.json({ msg: "Please Login" })
    }
}


module.exports = {
    auth
}

