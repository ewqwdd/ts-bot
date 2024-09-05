const helloMessage =
  `Альфа-версия Touch Skins уже доступна
Баги/Идеи/Проблемы: @touchskinshelp`;

const thanksMessage = (number) => `Спасибо, что записались на наш закрытый альфа-тест\nВсего записано: ${number}\n\nМы напишем вам, как только мы будем готовы`

const alreadySubscribed = (number) => `Вы уже записаны\nВсего записано: ${number}\n\nМы напишем вам, как только мы будем готовы`

const sendMessage = `Выпустили первую альфа-версию
Скачать можно здесь: https://t.me/touchskinshelp/650

Все ошибки/баги/идеи присылайте сюда: @touchskinshelp`

module.exports = { helloMessage, thanksMessage, alreadySubscribed, sendMessage };
