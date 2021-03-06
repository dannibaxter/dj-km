'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db/models')

const customUserRoutes = require('express').Router()

const User=db.User;

customUserRoutes.get('/', function (request, response, next) {
 User.findAll({})
 .then((result) => {
   response.json(result);
 }).catch(next);
});

customUserRoutes.post('/', function (request, response, next) {
    const newUserToCreate = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }
   User.findOrCreate({
     where: {
       email: request.body.email
     }
   })
   .spread((user, created) => {
     user.name=request.body.name;
     user.password=request.body.password;
     return user.save();
    })
    .then(user=>{
      console.log(user);
      response.json(user);
    })
    .catch(next);
});

customUserRoutes.delete('/:userId', function (request, response, next) {
  User.destroy({where:
      {id: request.params.userId}
  }).then(res => response.sendStatus(200)).catch(next);
})

customUserRoutes.put('/:userId', function(request,response,next){
  User.update(request.body,{
    where:{
      id:request.params.userId
    }
  })
  .then(response.sendStatus(200))
  .catch(next);
})

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
// const users = epilogue.resource({
//   model: db.model('users'),
//   endpoints: ['/users', '/users/:id']
// })

// const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
// users.delete.auth(mustBeLoggedIn)
// users.delete.auth(selfOnly('delete'))
// users.list.auth(forbidden('cannot list users'))
// users.read.auth(mustBeLoggedIn)
