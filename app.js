const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = process.env.PORT || 3000;

// Telegram
const BOT_ID = "@ababs_coin_bot";
const initialSupply = 1000000000000;
const TelegramBot = require("node-telegram-bot-api");
const token = "5422262184:AAHWugkFZL_XH33wiRA8HXgunSbSVfOtfMc";
const bot = new TelegramBot(token, { polling: true });
const commands = ["total", "max", "burnt", "info", "burned", "mcap", "circulating", "supply"];
const supplyCommands = ["total", "max", "burnt", "burned", "circulating"]

//

bot.onText(/\/(.+)/, async (msg, match) => {
  let req = match[1];
  let res = null;

  req.includes(BOT_ID) && (req = req.replace(BOT_ID, ''))
    commands.includes(req)
    && (res =
        req === "info"
            ? `This bot was made by @iredux as a part of vinuburn.com project.`
            : `qqqqq`)

    res !== null && bot.sendMessage(msg.chat.id,res,{reply_to_message_id: msg.message_id})
  
});


bot.onText(/iredux/, async (msg, match) => {
  //https://vitescan.io/vs-api/address?address=vite_000000000000000000000000000000000000000595292d996d&tabFlag=txns&pageNo=1
  // const response = await axios.get("https://vitescan.io/vs-api/address?address=vite_000000000000000000000000000000000000000595292d996d&tabFlag=txns&pageNo=1")
  // const data = response.data.data
  
  // console.log(data)
  // bot.sendMessage(msg.chat.id, data.accountInfo.address, {reply_to_message_id: msg.message_id})
})

bot.onText(/\/burnw/, (msg, match) => {
  bot.sendMessage(msg.chat.id, "Burn wallet address: https://vitescan.io/address/vite_000000000000000000000000000000000000000595292d996d", {reply_to_message_id: msg.message_id})
})


app.listen(port, () => console.log("...."));
