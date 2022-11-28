require("dotenv").config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors")
const corsOption = require("./DB/corsOption")

const connection = require("./DB/dbconfig")
const mongoconnect = require("./DB/mongodb")

const { logger } = require('./Middleware/logEvents')
const errorHandler  = require('./Middleware/errorHandler')

const home = require("./Routes/index")
const allData = require("./Routes/index")
const add = require("./Routes/index")
const update = require("./Routes/index")
const deletee = require("./Routes/index")


//conection to database
connection()
mongoconnect()


//Middleware
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors(corsOption))
app.use(logger)


//routes
app.use("/api/v1", home)
app.use("/api/v1", allData)
app.use("/api/v1", add)
app.use("/api/v1", update)
app.use("/api/v1", deletee)


//Error handler
app.use(errorHandler)


//server connection
const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))


// Handled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
