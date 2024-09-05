const { Telegraf, Markup } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const { helloMessage, thanksMessage, alreadySubscribed, sendMessage } = require("./messages");
const User = require("./User");
const { sendAll } = require("./send");
const csvParser = require('csv-parser');


const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'successful_users.csv',
  header: [
    { id: 'telegramId', title: 'Telegram ID' },
    { id: 'timestamp', title: 'Timestamp' }
  ]
});

const app = express();
const bot = new Telegraf(process.env.TOKEN);
const port = process.env.PORT || 3000; // Порт по умолчанию

const sticker = 'CAACAgIAAxkBAAMTZsKDdSGJNjSouqEwWSI5aOWII3EAAksCAAJWnb0KYlBF0FD6cZw1BA'

app.use(express.json());

bot.launch();

bot.start(async (ctx) => {
  await ctx.reply(helloMessage, Markup.inlineKeyboard([
    Markup.button.webApp('Открыть Touch Skins', 'https://touchskins.io'),
    Markup.button.url('Вступить в сообщество', 'https://t.me/touchskins')
  ]));
  await ctx.replyWithDocument('BQACAgIAAyEFAASDsHo8AAN7ZtmtF9yWdGqj36xR9SSa8S9uhdgAAnBXAAJ4P8lKDIL62WXt8_g2BA', {
    caption: 'Последняя версия',
  });
});

// bot.on('message', (ctx) => {
//   console.log(ctx.message);
// });

// bot.action('sign_up', async (ctx) => {
//   try {
//     const { id: telegramId, username } = ctx.from;
//     let user = await User.findOne({ telegramId });
//     let message
//     if (!user) {
//       user = new User({
//         telegramId,
//         username,
//         isAlphaTester: true
//       });
//       message = thanksMessage
//     } else {
//       user.isAlphaTester = true;
//       user.username = username;
//       message = alreadySubscribed
//     }

//     await user.save();
    
//     const totalUsers = await User.countDocuments();
//     await ctx.replyWithSticker(sticker);
//     await ctx.reply(message(totalUsers));

//   } catch (error) {
//     console.error('Error during sign up:', error);
//     await ctx.reply('Произошла ошибка, попробуйте снова позже.');
//   }
// });


let counterAll = 0
let counterSend = 0

// async function sendToUnprocessedUsers() {
//   try {
//     const allUsers = await User.find({});
//     for (const user of allUsers) {
//       if (!user.mail9424) {
//         counterAll++
//         try {
//             counterSend++
//             await bot.telegram.sendMessage(user.telegramId, sendMessage);
//             await User.updateOne({telegramId: user.telegramId}, {$set: {mail9424: true}})
//             console.log(user.telegramId)
//             await new Promise((res) => setTimeout(() => res(), 2000))
//         } catch (error) {
//           console.error(`Failed to send message to ${user.telegramId}:`, error);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error in sendToUnprocessedUsers:', error);
//   }
//   console.log(counterSend)
// }

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongodb is connected');
  // sendToUnprocessedUsers()
  // bot.telegram.sendMessage("5814769834", sendMessage);
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
