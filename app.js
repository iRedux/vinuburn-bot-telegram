const express = require("express")
const cors = require('cors')
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()
const port = process.env.PORT || 3000

// Telegram
const TelegramBot = require('node-telegram-bot-api');
const token = '5541697132:AAGXmJynSh2kx0Ui5TzdONDced4Of1EZnfc';
const bot = new TelegramBot(token, {polling: true});

const stringToInt = (num) => parseInt(num.replace(/,/g, ''))

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    // const chatId = msg.chat.id;
    // const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp);
// });

bot.onText(/\/supply/, async (msg, match) => {

    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    const maxSupply = stringToInt($('.maxSupplyValue')[0].children[0].data)
    const totalSupply = stringToInt($('.maxSupplyValue')[1].children[0].data)
    const burntSupply = 999999999999999 - totalSupply


    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Max Supply: ${maxSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
})


bot.onText(/\/burnt/, async (msg, match) => {

    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    const maxSupply = stringToInt($('.maxSupplyValue')[0].children[0].data)
    const totalSupply = stringToInt($('.maxSupplyValue')[1].children[0].data)
    const burntSupply = 999999999999999 - totalSupply

    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Burnt Supply: ${burntSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
})

bot.onText(/\/total/, async (msg, match) => {

    const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    const $ = cheerio.load(response.data)

    const maxSupply = stringToInt($('.maxSupplyValue')[0].children[0].data)
    const totalSupply = stringToInt($('.maxSupplyValue')[1].children[0].data)
    const burntSupply = 999999999999999 - totalSupply

    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Total Supply: ${totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id; 

    
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received youqqr message');
});
  
app.use(cors({
    origin: '*'
}));




app.get("/", async (req, res) => {
    // const response = await axios.get("https://coinmarketcap.com/currencies/vita-inu/")
    // const $ = cheerio.load(response.data)

    // const maxSupply = $('.maxSupplyValue')[0].children[0].data
    // const totalSupply = $('.maxSupplyValue')[1].children[0].data
    // const burntSupply = 999999999999999 - stringToInt(totalSupply)

    // res.json({
    //     data: {
    //         maxSupply: stringToInt(maxSupply),
    //         totalSupply: stringToInt(totalSupply),
    //         burntSupply: burntSupply
    //     }
    // })
    res.send("iRedux")
})


app.listen(port, () => {
    console.log("Loaded...")
})
