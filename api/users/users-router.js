const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const UserModel = require('./users-model')
const PostModel = require('../posts/posts-model')
// The middleware functions also need to be required
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');
const { OPEN_READWRITE } = require('sqlite3');

const router = express.Router();


router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  UserModel.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.name)
  UserModel.insert({name: req.name})
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
});

router.put('/:id',validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.name)
  console.log(req.user)
  UserModel.update(req.params.id, {name : req.name})
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
  UserModel.remove(req.params.id)
  .then(user =>{
    res.json(req.user)
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});


router.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    customMessage: 'something went wrong inside user router',
    errorMessage: err.message,
    stack: err.stack,
  })
})
// do not forget to export the router

module.exports = router;