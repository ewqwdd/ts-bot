const { Telegraf, Markup } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const { helloMessage, thanksMessage, alreadySubscribed } = require("./messages");
const User = require("./User");

const app = express();
const bot = new Telegraf(process.env.TOKEN);
const port = process.env.PORT || 3000; // Порт по умолчанию

const sticker = 'CAACAgIAAxkBAAMTZsKDdSGJNjSouqEwWSI5aOWII3EAAksCAAJWnb0KYlBF0FD6cZw1BA'

app.use(express.json());

// Запуск бота
bot.launch();

bot.start(async (ctx) => {
  await ctx.reply(helloMessage, Markup.inlineKeyboard([
    Markup.button.callback('Записаться', 'sign_up')
  ]));
});

bot.on('sticker', (ctx) => {
  console.log(ctx.message);
});

bot.action('sign_up', async (ctx) => {
  try {
    const { id: telegramId, username } = ctx.from;
    let user = await User.findOne({ telegramId });
    let message
    if (!user) {
      user = new User({
        telegramId,
        username,
        isAlphaTester: true
      });
      message = thanksMessage
    } else {
      user.isAlphaTester = true;
      user.username = username;
      message = alreadySubscribed
    }

    await user.save();
    
    const totalUsers = await User.countDocuments();
    await ctx.replyWithSticker(sticker);
    await ctx.reply(message(totalUsers));

  } catch (error) {
    console.error('Error during sign up:', error);
    await ctx.reply('Произошла ошибка, попробуйте снова позже.');
  }
});

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongodb is connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
