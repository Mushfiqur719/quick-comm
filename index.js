const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const {notFound,errorHandler} = require("./middlewares/errorHandler.js")
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute")

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const winston = require('winston');
const expressWinston = require('express-winston');


dbConnect();
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())
// log requests using express-winston
// app.use(expressWinston.logger({
//     transports: [
//       new winston.transports.File({ filename: 'server.log' })
//     ],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     )
//   }));
  

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}....`)
});