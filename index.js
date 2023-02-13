const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const authRouter = require("./routes/authRoute");
dbConnect();

app.use("/",(req,res)=>{
    res.send("Hello from server side");
})

app.use("/api/user", authRouter);

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});