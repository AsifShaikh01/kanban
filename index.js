const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")

const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.routes");
const { taskRouter } = require("./routes/Tasks.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user" , userRouter);
app.use("/tasks" , taskRouter);

app.listen(process.env.PORT , async ()=>{
    try {
        await connection;
        console.log("connected to the db!!")
        
    } catch (error) {
        console.log("cannot connect to the db!!" , error)
    }
    console.log(`server is running at port ${process.env.PORT}`)
})