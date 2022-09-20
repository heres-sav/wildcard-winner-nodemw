const database = require("mongoose");
const dbConfig = require("../../conf/dbConfig");

const url = `mongodb+srv://${dbConfig.dbProfile.username}:${dbConfig.dbProfile.password}@cluster0.syspcjd.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

database.connect(url, connectionParams)
.then( () => {
  console.log('Connected to the database')
})
.catch( (err) => {
  console.error(`Error connecting to the database. n${err}`);
})

module.exports = database;