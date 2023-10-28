const Sequelize = require("sequelize")

const sequelize = new Sequelize('atv03backend', 'newuser', 'mysql',  
{host:  '127.0.0.1', port: '3306', dialect: 'mysql'})

sequelize.authenticate()
    .then(() => console.log("Conectado no Mysql!"))
    .catch(error => console.log(error))

module.exports = sequelize