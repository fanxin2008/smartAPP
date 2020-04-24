var request = require('request'); 
const cheerio = require('cheerio')
const baseUrl = "https://yingyang.911cha.com/";
const fs = require('fs');
let indexdata = [];
let foodindex = [];
 
function startReq(url) {
    request(url, function (error, response, body) {
        const $ = cheerio.load(body); // 这里可以获取当前url的页面的html
        const data = $('.mainbox .leftbox .panel .mcon p a');
        data.map((k) => {
            const item = datali[k];
            const href = item.attribs.href;
            const title = item.children[0].data;
            // console.log('data[k]------------->', ii);
            foodindex.push({title:title,href: baseUrl + href});
        })
        fs.writeFile('./result/indexList.json',JSON.stringify(indexdata,"","\t"), 'utf8', (err)=>{
            if (err) throw err;
            console.log('indexList 文件已被保存');
        })
    });
}
 
// for (let i = 1; i < 10; i++) {
    const url = baseUrl;
    startReq(url);
// }
