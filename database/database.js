const mongoose = require('mongoose');

let databaseConnection = async()=>{
   const connection = await mongoose.connect('mongodb://localhost:27017/booksDB')
   try{
      console.log("Database connection Successful !!!!")
   }
   catch(error){
      console.log(error);
   }
}

databaseConnection();
module.exports = databaseConnection;