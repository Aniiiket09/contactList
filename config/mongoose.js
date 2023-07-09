//require librarries
const mongoose = require("mongoose");
//connected to the data base
mongoose.connect("mongodb://127.0.0.1:27017/Contact_List");
//acquire the connection (to check if it is sucessful)
const db = mongoose.connection;

//error
db.on("error", console.log.bind(console, "error connecting to db"));

//up and running print the message
db.once("open", function () {
  console.log("Sucessfully connected with database");
});
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/Contact_List", {
//     // useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connection is successfully");
//   })
//   .catch((e) => {
//     console.log("No Connection");
//   });
