const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const {User}=require('../models/user')
const bcrypt = require('bcryptjs')

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

module.exports = {
  login: async (req, res) => {
    // const {username,id}=req.body
    // const token=createToken(username,id)
    try {
      const{username,password}=req.body
      const foundUser=await User.findOne({where:{username:username}})
      if(foundUser){
        const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
        if(isAuthenticated){
          const token=createToken(foundUser.dataValues.username,foundUser.dataValues.id)
          const exp = Date.now() + 1000 * 60 * 60 * 48
          res.status(200).send({username:foundUser.dataValues.username, userId:foundUser.dataValues.id, token:token, exp:exp})
        }else{
          res.status(400).send('Password incorrect.')
        }
      }else{
        res.status(400).send('User does not exist.')
      }
      
    } catch (error) {
      console.log(error)
    }
  },
  register: async (req, res) => {
    try {
      const {username,password}=req.body
      const foundUser=await User.findOne({where:{username:username}})
      if(foundUser){
        res.status(400).send("Already is existed!")
      }else{
        const salt = bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)

        const newUser= await User.create({username:username,hashedPass:hash})
        const token=createToken(newUser.dataValues.username,newUser.dataValues.id)
        const exp = Date.now() + 1000 * 60 * 60 * 48
        res.status(200).send({username:newUser.dataValues.username, userId:newUser.dataValues.id, token:token, exp:exp}) //user register functionality 
      }
    } catch (error) {
      console.error(error)
    }
  },
};
