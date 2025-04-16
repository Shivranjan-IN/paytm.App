
const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors")
 const app = express();
app.use(cors()); // ye frontend aur backend ko different different port se request accept karta hai (allows your backend to accept requests from different origins (like your frontend running on a different port).)
app.use(express.json());

const aaccountRouter = require("./routes/account")
const userRouter = require("./routes/user");
app.use("/api/v1" , mainRouter);
app.use("/api/v1/user", userRouter)
app.use ("/api/v1/account" , aaccountRouter);




app.listen (3000);





 
