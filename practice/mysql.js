var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

let query = (sql, values) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

};

let createTable = (sql) => {
    return query(sql, [])
};

let wx_posts =
    `create table if not exists wx_posts(
     id INT NOT NULL AUTO_INCREMENT,
     msgBiz VARCHAR(100) NOT NULL COMMENT 'msgBiz',
     msgIdx VARCHAR(100) NOT NULL COMMENT 'msdIdx',
     msgMid VARCHAR(100) NOT NULL COMMENT 'msgMid',
     updatedAt DATETIME NOT NULL COMMENT '更新时间',
     sourceUrl VARCHAR(500) NOT NULL COMMENT '原文链接',
     digest VARCHAR(100) NOT NULL COMMENT '文章摘要',
     cover VARCHAR(500) NOT NULL COMMENT '文章图片链接',
     publishAt DATETIME NOT NULL COMMENT '发布日期',
     link VARCHAR(500) NOT NULL COMMENT '文章链接',
     title VARCHAR(500) NOT NULL COMMENT '文章标题',
     content TEXT NOT NULL COMMENT '文章内容',
     PRIMARY KEY ( id )
    );`;

let wx_profile =
    `create table if not exists wx_profile(
     id INT NOT NULL AUTO_INCREMENT,
     msgBiz VARCHAR(100) NOT NULL COMMENT '标识符',
     updatedAt DATETIME NOT NULL COMMENT '更新日期',
     openHistoryPageAt DATETIME NOT NULL COMMENT '打开历史页的日期',
     headimg VARCHAR(500) NOT NULL COMMENT '头像链接',
     title VARCHAR(40) NOT NULL COMMENT '用户名',
     createdAt DATETIME NOT NULL COMMENT '创建时间',
     PRIMARY KEY(id)
    );`;

console.log(createTable(wx_profile));
console.log(createTable(wx_posts));







