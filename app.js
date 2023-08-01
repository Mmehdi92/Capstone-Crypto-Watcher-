import bodyParser from "body-parser";
import express from "express"
import axios from "axios";

const app = express();
const port = 3000;
const baseUrl =  "https://api.blockchain.com/v3/exchange/l2/"

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})