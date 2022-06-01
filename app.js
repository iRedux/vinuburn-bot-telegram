const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()
const port = process.env.PORT || 3000

// Telegram
const TelegramBot = require('node-telegram-bot-api')
// const token = 'XXX'
const token = 'XXX' // test one
const bot = new TelegramBot(token, {polling: true})
const commands = ['total', 'max', 'burnt', 'info']

// 
const stringToInt = (num) => parseInt(num.replace(/,/g, ''))
const intToString = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
const capitalizeFirstLetter = (str) => str.replace(/^./, str[0].toUpperCase())

const getSupply  = async() => {
    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    const maxSupply = stringToInt($('.maxSupplyValue')[0].children[0].data)
    const totalSupply = stringToInt($('.maxSupplyValue')[1].children[0].data)
    const burntSupply = 999999999999999 - totalSupply

    return({
        info: "Hello world",
        total: intToString(totalSupply),
        max: intToString(maxSupply),
        burnt: intToString(burntSupply)
    })
}

bot.onText(/\/(.+)/, async (msg, match) => {
    let req = match[1]
    let res = null

    commands.includes(req)
        ? res = (req === "info")
            ? `This bot was made by @iredux as a part of vinuburn.com project.`
            : `${capitalizeFirstLetter(req)} Supply: ${(await getSupply())[req]}`
        : res = `Wrong command`
    
    bot.sendMessage(msg.chat.id, res);
})


app.listen(port, () => console.log("...."))
