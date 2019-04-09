const { DBCONF } = require('../constUtils');
const mysql = require('mysql');
const db = {};
const defaultConf = {
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'k1200',
    stringifyObjects: true
};
db.connection = () => {
    const connection = mysql.createConnection(Object.assign(defaultConf, DBCONF));
    //数据库连接
    connection.connect(err => {
        if(err){
            console.log(`mysql连接失败: ${err}!`);
        }
    });
    return connection;
};
//关闭数据库
db.close = connection => {
    //关闭连接
    connection.end(err => {
        if (err) {
            return false;
        }else{
            console.log('关闭连接');
        }
    });
};
db.curd = (sql, param = '', connection = db.connection()) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, param, (error, data) => {
            error ? reject(error) : resolve(data);
        })
    })
};

exports = module.exports = db;
