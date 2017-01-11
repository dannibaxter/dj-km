'use strict'

const epilogue = require('./epilogue');
const db = require('APP/db');
const { OrderProduct, Order, Product, User } = require('APP/db/models');
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

// --------------------------------------------------------------------------

// Orders GET :orderNumber
customOrderRoutes.get('/:orderNumber', function (request, response, next) {
  Order.findOne({
    include: [ Product, User ],
    where: {
      orderNumber: request.params.orderNumber
    }
  })
  .then((order) => {
    response.json(order);
  })
  .catch(next);
});

// --------------------------------------------------------------------------

// Orders GET :orderNumber/user
customOrderRoutes.get('/:orderNumber/user', function (request, response, next) {
  Order.findOne({
    include: [ Product, User ],
    where: {
      orderNumber: request.params.orderNumber
    }
  })
  .then((order) => {
    response.json(order.user);
  })
  .catch(next);
});

// --------------------------------------------------------------------------

// Orders GET :orderNumber/products
customOrderRoutes.get('/:orderNumber/products', function (request, response, next) {

  const products = [];

  Order.findOne({
    include: [ Product, User ],
    where: {
      orderNumber: request.params.orderNumber
    }
  })
  .then((order) => {
    order.products.map((prod, index) => {
      return products[index] = {
        artistName: prod.artistName,
        description: prod.description,
        price: prod.order_products.price,
        quantity: prod.order_products.quantity,
        totalAmount: prod.order_products.totalAmount,
        id: prod.id,
        image: prod.image,
        genre: prod.genre,
        location: prod.location,
        email: prod.email,
        audioSample: prod.audioSample,
        rating: prod.rating
      }
    });

    response.json(products);
  })
  .catch(next);
});


// --------------------------------------------------------------------------

// Orders POST
// Request.body must have
// - user_id: is an id (id is a string)
// - products: array of objects. Each object has
      // - pId (strings)
      // - quantity (strings)
      // - price (strings)

// Example Input Object (i.e., request.body):
// {
//   "deliveryAddress": "5 Hanover Square, New York, NY 10001",
//   "products": [
//     { "pId": "1", "quantity": "10", "price": "100" },
//     { "pId": "2", "quantity": "20", "price": "200" }
//     ],
//   "user_id": "2",
//   "quantity": ["10", "20"]
// }

customOrderRoutes.post('/', function (request, response, next) {

  const cartProducts = request.body.products;
  const cartProductIds = [];
  cartProducts.forEach((product) => {
    cartProductIds.push(product.pId);
  });
  let grandTotal = 0;

  Order.create({
    deliveryAddress: request.body.deliveryAddress
  })
  .then((order) => {

      return User.findOne({
        where: {
          id: request.body.user_id
        }
      })
      .then((user) => {
        return order.setUser(user);
      });

  })
  .then((order) => {

      return Product.findAll({
        where: {
          id: cartProductIds
        }
      })
      .then((productsArray) => {
        productsArray.forEach((prod) => {
          cartProducts.forEach((cartPr) => {
            if(prod.id.toString()===cartPr.pId.toString()) {
              grandTotal += cartPr.quantity*cartPr.price;
              order.addProduct(prod, {
                quantity: cartPr.quantity,
                price: cartPr.price,
                totalAmount: cartPr.quantity*cartPr.price
              });
            }
          });
        });
        return order;
      });

  })
  .then((order) => {
      order.grandTotal = grandTotal;
      return order.save();
  })
  .then((order) => {
      response.sendStatus(200);
  })
  .catch(next);
});

// --------------------------------------------------------------------------

// Orders PUT
// For MVP, we will not provide the ability to update an order after it is submitted

// --------------------------------------------------------------------------

// Orders DELETE
// Request.body must have
// - orderNumber: is a string

// Example Input Object (i.e., request.body):
// {
//   "orderNumber": "2F29EEF8D4"
// }
customOrderRoutes.delete('/', function (request, response, next) {
  Order.destroy({
    where: {
      orderNumber: request.body.orderNumber
    }
  })
  .then((deleted) => {
    response.sendStatus(200);
  })
  .catch(next);
});

module.exports = customOrderRoutes;
