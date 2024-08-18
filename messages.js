const helloMessage =
  "Привет! Мы собираем группу для закрытого альфа-тестирования в ближайшем будущем. Будем рады вашей персоне, записывайтесь!";

const thanksMessage = (number) => `Спасибо, что записались на наш закрытый альфа-тест\nВсего записано: ${number}\n\nМы напишем вам, как только мы будем готовы`

const alreadySubscribed = (number) => `Вы уже записаны\nВсего записано: ${number}\n\nМы напишем вам, как только мы будем готовы`

module.exports = { helloMessage, thanksMessage, alreadySubscribed };
