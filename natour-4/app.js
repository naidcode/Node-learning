const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/toursroutes')
const userRouter = require('./routes/userroutes')

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use((req, res, next) => {
  console.log('hello world my name is middleware 🫡');
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "now app is running on browser and postman.",
//     app: "natours",
//   });
// });





// app.get('/api/v1/tours' , Getalltours);
// app.patch('/api/v1/tours/:id' , PatchallTours) // Patch is for updating
// app.get('/api/v1/tours/:id' , secondGetalltours)
// app.post('/api/v1/tours', PostallTours); //createtours post is for creating
// app.delete('/api/v1/tours/:id' , deleteTours) // delete is for deleting







app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app
