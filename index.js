const express = require("express");
const path = require("path");
const port = 8001;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

// const Contact = require("/");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// Middleware 1
// app.use(function (req, res, next) {
//   req.myname = "aniket";
//   // console.log("midddle ware 1 called");
//   next();
// });~
// // Middleware 2
// app.use(function (req, res, next) {
//   console.log("midddle ware 2 called :", req.myname);
//   next();
// });

var contactList = [
  {
    name: "aniket",
    phone: "111111",
  },
  {
    name: "aniket2",
    phone: "8888",
  },
  {
    name: "aniket3",
    phone: "123",
  },
];

// app.get("/", function (req, res) {
//   // console.log("its get called by router controller :", req.myname);
//   console.log(__dirname);
//   return res.render("home", {
//     title: "Contacts List",
//     contact_list: contactList,
//   });
// });
app.get("/", async (req, res) => {
  try {
    const ContactList = await Contact.find({});
    return res.render("home", {
      title: "My Contact List",
      contact_list: ContactList,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/play", function (req, res) {
  console.log(__dirname);
  return res.render("practice", { title: "The playing football" });
});

app.post("/create-contact", async function (req, res) {
  //   // contactList.push({
  //   //   name: req.body.name,
  //   //   phone: req.body.phone,
  //   // });
  //   // console.log(req.body);
  //   // contactList.push(req.body);
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    console.log("**********", newContact);
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating contact");
    return res.redirect("back");
  }
});

//for deleteing the contact
app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;

  Contact.findByIdAndDelete(id)
    .then((deletedContact) => {
      console.log("Deleted contact:", deletedContact);
      return res.redirect("back");
    })
    .catch((error) => {
      console.error("Error deleting contact:", error);
      return res.redirect("back");
    });
});
// app.get("/delete-contact", function (req, res) {
// console.log(req.query);
// //get the query from the url
// let phone = req.query.phone;

// let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
// if (contactIndex != -1) {
//   contactList.splice(contactIndex, 1);
// }
// return res.redirect("back");
// });
app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("yup! our exress server is running on port : ", port);
});
