const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const noticeRoutes = require("./routes/noticeRoutes")

app.use(cors());
app.options('/{*any}', cors());
app.use(express.json());

app.use("/api/notices", noticeRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database Connection is ready...')

        //Server
        app.listen(process.env.PORT, () => {
            console.log(`server is running http://localhost:${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("connection error:" + err);
    })

