const PORT = 3000;

const path = require('path');
const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require('cors')
const bodyParser = require("body-parser")

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true}));

const db = mysql.createConnection({
    user: "bce648d0ad3ef0",
    host: "us-cdbr-east-03.cleardb.com",
    password: "ea902403",
    database: "heroku_6d426ebf751c5e8",
});

app.post("/fav", (req, res) => {
        const favTitle = req.body.favTitle;
        db.query(
            "INSERT INTO favorites SET favTitle = ?", 
            [favTitle], 
            (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Updated Fav")
                }
            }
        );
})

app.get("/fav", (req, res) => {
        db.query(
            "SELECT * FROM favorites",
             [],
             (err, result) => {
                 if (err){
                     console.log(err);
                 }
                 else{
                     res.send(result)
                 }
             })
})

app.listen(process.env.PORT, ()=> {
    console.log('Server Running' + process.env.PORT);
})