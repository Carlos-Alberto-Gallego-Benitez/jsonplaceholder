// import Factory from '@ioc:Adonis/Lucid/Factory'
const mysql = {
    connection: process.env.DB_CONNECTION,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB_NAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST, // Servidor que aloja la base de datos de postgres
    port: process.env.MYSQL_PORT,
    max: process.env.PG_MAX, // max número de clientes en el pool
    min: process.env.PG_MIN, //min numero de clientes en el pool
    idleTimeoutMillis: process.env.PG_INACTIVO, // cuánto tiempo se permite que un cliente permanezca inactivo antes de ser cerrado
    acquire: process.env.PG_ACQUIRE, // time require to reconnect 
    idle: process.env.PG_IDLE, // get idle connection
    evict: process.env.PG_EVICT // it actualy removes the idle connection
}

module.exports = mysql
