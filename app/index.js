// console.log("hello word !");

// let age = 12;
// let name = 'jaho';
// let catehories = ["chaussure","pantalon","téléphone"];
// let active = true;

// if(age>5){
//   console.log(categories);
// }

// categories.forEach((cat, index )=> {
//   console.log(index +':'+ cat);

// });

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const classesRouter = require('./routes/classes');
const studentRouter = require('./routes/students');
const { Session } = require('inspector');
var cookieParser = require('cookie-parser');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Session({
  secret: 'secret12',
}))
app.use('/classes', classesRouter);
app.use('/students', studentRouter);


mongoose.connect('mongodb://root:root@mongo:27017/b3?authSource=admin', {
  useNewUrlParser: true
}, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('BD connect !');
  }
})

app.get("/", (request, response) => {
  res.status(200).send('<h1>Hello world !</h1>');
});

app.listen(4500, () => {
  console.log('server is running on http://127.0.0.1.4500');
});