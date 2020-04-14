var request = require('request'); 
const cheerio = require('cheerio')
const baseUrl = "https://yingyang.911cha.com";
const fs = require('fs');
let foodList = [];
let urlList = undefined;
let timer = null;
 
function startReq(url,tit) {
    request(url, function (error, response, body) {
        const $ = cheerio.load(body); // 这里可以获取当前url的页面的html
        const data1 = $('.l3 a');
        const data2 = $('table a');
        // console.log(data);
        const data = data1.length > 0 ? data1 : data2
        data.map((k) => {
            const item = data[k];
            const href = item.attribs.href;
            const title = item.children[0].data;
            // console.log('data[k]------------->', item);
            foodList.push({title:title,href: baseUrl + href});
        })
        console.log(tit,'获取结束');
        // saveAsJson(foodList,'./result/temp.json');
    });
}


function saveAsJson(data,fillname) {
    fs.writeFile(fillname,JSON.stringify(data,"","\t"), 'utf8', (err)=>{
        if (err) throw err;
        console.log(fillname,' 文件已被保存');
    }) 
}

function startReqBytime(urlList){
    let len = urlList.length;
    let i = 0;
    timer = setInterval(function() {
        let url = urlList[i].href || '';
        let title = urlList[i].title || '';
        if(url,title) {
            console.log(title,'获取开始');
            startReq(url,title);
        }
        i++;
        if (i > len -1) {
            clearInterval(timer)
            saveAsJson(foodList,'./result/foodList.json');
        }
        
      }, 10000)
}

fs.readFile('./result/indexList.json','utf8', (err, data) => {
    if (err) throw err;
    urlList = JSON.parse(data);
    startReqBytime(urlList);
});
 
// for (let i = 1; i < 10; i++) {
    // const url = baseUrl;
    // startReq('https://yingyang.911cha.com/./list_1.html');
// }
