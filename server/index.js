const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, resp, next)=>{
    resp.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/app/v1", mainRouter)

app.listen(3000, ()=>{
    console.log("backend started");
})
