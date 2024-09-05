const mongoose = require("mongoose");
const User = require("./User");
const csvWriter = require('csv-writer').createObjectCsvWriter;
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Mongodb is connected');
    exportToCSV()
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });


  async function exportToCSV() {
    try {
      const users = await User.find({}, 'telegramId username').lean();
  
      const csvFilePath = 'users.csv';
      const csvHeaders = [
        { id: 'telegramId', title: 'Telegram ID' },
        { id: 'username', title: 'Username' }
      ];
  
      const writer = csvWriter({
        path: csvFilePath,
        header: csvHeaders
      });
  
      await writer.writeRecords(users);
      console.log('CSV file was written successfully');
    } catch (error) {
      console.error('Error exporting data to CSV:', error);
    } finally {
      mongoose.connection.close();
    }
}