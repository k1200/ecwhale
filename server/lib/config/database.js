const { DBCONF } = require('../utils');
const mysql = require('mysql');
const db = {};
const defaultConf = {
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'sakujima_test1226',
    stringifyObjects: true
};
db.connection = () => {
    const connection = mysql.createConnection(Object.assign(defaultConf, DBCONF));
    //数据库连接
    connection.connect(err => {
        if(err){
            console.log(`mysql连接失败: ${err}!`);
        }else{
            console.log('mysql连接成功!');
        }
    });
    return connection;
};
//关闭数据库
db.close = connection => {
    //关闭连接
    connection.end(err => {
        if (err) {
            return;
        }else{
            console.log('关闭连接');
        }
    });
};
db.curd = (sql, param = '', connection = db.connection()) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, param, (err, data) => {
            if(err) {
                err.type = 'sql';
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

exports = module.exports = db;
