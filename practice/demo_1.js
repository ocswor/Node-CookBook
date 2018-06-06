'use strict';
const request = require('request');
const cheerio = require('cheerio');
var fs = require("fs");

var link = 'https://mp.weixin.qq.com/s?__biz=MjM5NzY1MDMwMA==&mid=2658563715&idx=1&sn=076a20dcb9c45b60912df91fb1dd264d&chksm=bd541c908a23958670cf2be0f0647225fbc3f3675b08c747538cec1eae09afbef564c1865bb1&scene=0#rd'


async function myrequest() {
    request(link, null, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body.url);
        // console.log(body);
        const $ = cheerio.load(body, {decodeEntities: false});
        let content;
        if (true) {
            content = $('#js_content').html() || '';
        } else {
            content = $('#js_content').text() || '';
        }
        console.log(content);
        writefile(content);
        console.log('end')
    });


}


async function writefile(content) {
    console.log("准备写入文件");
    let header = '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Title</title>\n' +
        '</head>\n' +
        '<body>';
    let tail = '</body>\n' +
        '</html>';
    fs.writeFile('input.html', header + content + tail, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------");
        console.log("读取写入的数据！");
        fs.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
}

myrequest();
console.log('哈哈哈');