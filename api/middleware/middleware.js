const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`Method: ${req.method}, URL: ${req.url}, ${new Date().toISOString()}`)
  next()
} 

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message: 'no such user'
      })
    }else{
      req.user = user;
      next()
    }
  }catch(err){
    res.status(500),json({
      message: 'problem finding user'
    })
  }
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId}