const express = require('express');

const tourController = require('./../controller/tourcontroller');

const Router = express.Router();

Router.param((req,res,next,val) => {
  console.log(`the route id is ${val}`)
})

Router.route('/')
  .get(tourController.Getalltours)
  .post(tourController.PostallTours);
// this both wortk same what we did it before we chanined it to show you if the they have same url on that time you can chain it like this.

Router.route('/:id')
  .get(tourController.secondGetalltours)
  .patch(tourController.PatchallTours)
  .delete(tourController.deleteTours); // this would be the same as before we have the sane url on this three rouutes so we just chained it.

module.exports = Router;
