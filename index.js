const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();
// Замените на токен вашего бота
const bot = new Telegraf(process.env.TOKEN);
const express = require("express");
const app = express();
const port = process.env.PORT;

// Замените на ваш канал
const channelUsername = process.env.CHANNEL;

app.use(express.json());

// bot.command("check", async (ctx) => {
//   const userId = ctx.from.id;

//   try {
//     const chatMember = await ctx.telegram.getChatMember(channelUsername, userId);

//     if (
//       chatMember.status === "member" ||
//       chatMember.status === "administrator" ||
//       chatMember.status === "creator"
//     ) {
//       ctx.reply("Вы подписаны на канал!");
//     } else {
//       ctx.reply("Вы не подписаны на канал.");
//     }
//   } catch (error) {
//     console.error("Error checking membership:", error);
//     ctx.reply("Произошла ошибка при проверке подписки. Пожалуйста, попробуйте позже.");
//   }
// });

// bot.launch();

app.post("/bot/check", async (req, res) => {
  const userId = req.body.telegramId;

  if (!userId) {
    return res.status(400).json({
      message: "No telegramId provided",
    });
  }

  try {
    const chatMember = await bot.telegram.getChatMember(channelUsername, userId);

    if (
      chatMember.status === "member" ||
      chatMember.status === "administrator" ||
      chatMember.status === "creator"
    ) {
      return res.status(200).json({
        message: "User is subscribed to the channel",
        isSubscribed: true,
      });
    } else {
      return res.status(200).json({
        message: "User is not subscribed to the channel",
        isSubscribed: false,
      });
    }
  } catch (error) {
    console.error("Error checking membership:", error);
    return res.status(500).json({
      message: "An error occurred while checking subscription",
      error: error.message,
      isSubscribed: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
