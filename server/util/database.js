require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize=new Sequelize(CONNECTION_STRING,{
    dialect:'postgres',
    
})
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db; 
// module.exports=sequelize - it doesnt work in this way