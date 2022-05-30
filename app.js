const express = require("express")
const cors = require('cors');
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*'
}));


function stringToInt(num) {
    return parseInt(num.replace(/,/g, ''))
}

app.get("/", async (req, res) => {
    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    const maxSupply = $('.maxSupplyValue')[0].children[0].data
    const totalSupply = $('.maxSupplyValue')[1].children[0].data
    const burntSupply = 999999999999999 - stringToInt(totalSupply)

    res.json({
        data: {
            maxSupply: stringToInt(maxSupply),
            totalSupply: stringToInt(totalSupply),
            burntSupply: burntSupply
        }
    })
})


app.listen(port, () => {
    console.log("Loaded...")
})
