const path = require('path');
const express = require("express")
const cors = require('cors');
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()
const port = process.env.PORT || 3001

app.use(cors({
    origin: '*'
}));



app.get("/api", async (req, res) => {
    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    // $('.maxSupplyValue').each((index, element) => {
    //     console.log(index)
    // })
    
    const maxSupply = $('.maxSupplyValue')[0].children[0].data
    const totalSupply = $('.maxSupplyValue')[1].children[0].data
    const burntSupply = 999999999999999 - parseInt(totalSupply.replace(/,/g, ''))

    // async function getPrice() {
    // }

    res.json({
        data: {
            maxSupply: parseInt(maxSupply.replace(/,/g, '')),
            totalSupply: parseInt(totalSupply.replace(/,/g, '')),
            burntSupply: burntSupply
        }
    })
})

// All other GET requests not handled before will return our React app
app.get("/", (req, res) => {
    res.send("Hello!")
})

  
app.listen(port, () => {
    console.log("port 3000")
})
