let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,// 一次性最多连接十次
    host: 'localhost',// 主机名或者地址，mysql数据库中自己设置的
    user: 'root',//用户名，mysql数据库中自己设置的
    port: '3306',// 连接的端口号,mysql数据库中自己设置的
    password: '123456',//登入MySQL的密码，mysql数据库中自己设置的
    database: 'blogs'//MySQL数据中一个库的名字，mysql数据库中自己设置的
})

module.exports = pool;