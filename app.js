import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const baseUrl = "https://api.blockchain.com/v3/exchange";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let result = await axios.get(baseUrl + "/tickers");

    // filter the top 5 biggest volume 24h out and return them
    let cryptoData = result.data;
    cryptoData.sort((a, b) => b.volume_24h - a.volume_24h);
    let top5BiggestVolume = cryptoData.slice(0, 10);
    console.log(top5BiggestVolume);

    res.render("index.ejs", { crypto: top5BiggestVolume });
  } catch (error) {
    console.log(error.error);
  }
});

app.post("/", async (req, res) => {
  try {
    const userInput = req.body.inputsearch;
    let data = await axios.get(baseUrl + "/tickers/" + `${userInput}`);
    res.render("index.ejs", { searchedCrypto: data });
  } catch (error) {
    console.log("error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
