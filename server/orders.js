'use strict'

const epilogue = require('./epilogue');
const db = require('APP/db');
const { Order, Product, User } = require('APP/db/models');
const customOrderRoutes = require('express').Router();

// Orders GET
customOrderRoutes.get('/', function (request, response, next) {
  Order.findAll({
    include: [ Product, User ]
  })
  .then((orderArray) => {
    response.json(orderArray);
  })
  .catch(next);
});

// Orders POST
customOrderRoutes.post('/', function (request, response, next) {
  Order.create({
    user_id: request.body.user_id
  })
  .then((order) => {
    Product.findAll({
      where: {
        id: request.body.productIds
      }
    })
    .then((productsArray) => {
      return order.setProducts(productsArray);
    })
    .then((updatedOrder) => {
      response.json(updatedOrder);
    });
  })
  .catch(next);
});



module.exports = customOrderRoutes;

// Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
//   model: db.model('orders'),
//   endpoints: ['/orders', '/orders/:id']
// })

// const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
// users.delete.auth(mustBeLoggedIn)
// users.delete.auth(selfOnly('delete'))
// users.list.auth(forbidden('cannot list users'))
// users.read.auth(mustBeLoggedIn)
