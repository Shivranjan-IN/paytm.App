const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")
const zod = require("zod")
const { authMiddleware } = require("./middleware");

const { User, Account } = require("../db");


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),

})


router.post("/signup", async (req, res) => {

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email  signup already taken / Incorrect input"
        })
    }

    const existUser = await User.findOne({
        username: req.body.username
    })
    if (existUser) {
        return res.status(411).json({
            message: "Email is signup  already taken / Incorrect input"
        })
    }


    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstName,
        lastname: req.body.lastName,

    })
    const userId = user._id;


    //create new account .....

    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000
    })


    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfull",
        token: token
    })
}

)




router.post("/signin", async (req, res) => {

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email  signin already taken / Incorrect input"
        })
    }

    const existUser = await User.findOne({
        username: req.body.username
    })
    // if (existUser) {
    //     return res.status(411).json({
    //         message: "Email  signin is already taken / Incorrect input"
    //     })
    // }

    const user = User.create({
        username: req.body.username,
        // password: req.body.password,


    })
    if (existUser) {

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            message: "signin successfull",
            token: token
        })
    }

    res.status(404).json({
        message: "Error While logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body)

if (!success) {
    res.status(411).json({
        mmessage: "Error while updating information"
    })

}
await User.updateOne({ _id: req.userId }, req.body);
res.json({
    message: "update Successfully"
})
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        //The $or operator is used to match documents that satisfy at least one of the conditions specified in the array.
        $or: [{
            firstName: {
                "$regex": filter
                // Matches users whose firstName field contains the substring specified by filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;

module.exports = router;
