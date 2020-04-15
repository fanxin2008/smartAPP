var request = require('request'); 
const cheerio = require('cheerio')
const baseUrl = "https://yingyang.911cha.com";
const fs = require('fs');
let foodList = [];
let urlList = {};
let initem = {};
let fname = 0;
let timer = 0;
let i = 0;
let g_tag = false;

function startReq(url,tit) {
    request(url, function (error, response, body) {
        const $ = cheerio.load(body); // 这里可以获取当前url的页面的html
        // const data1 = $('.l3 a');
        const data = $('table tr');
        // console.log(data);
        // const data = data1.length > 0 ? data1 : data2
        let k = null;
        let v = null;
        initem['name'] = tit;
        data.map((m) => {
            const item = data[m].children;
            item.map((t) => {
                if(t.name == 'th') {
                    if(k = t.children[0].name == 'a') {
                        k = t.children[0].children[0].data;
                    }
                    if(t.next.children[0].type == 'text') {
                        v = t.next.children[0].data;
                        if(t.next.children[0].next.name == 'span') {
                            v = v + t.next.children[0].next.children[0].data;
                        }
                    } 
                    initem[k] = v;
                } 
                // console.log(urlList);
                // console.log(t.name,t.children)
            })
        })
        foodList.push(initem);
        console.log(tit,'获取结束');
        initem = {};
        saveAsJson();
    });
}


function saveAsJson() {
    // const data = foodList;
    // i = i + foodList.length;
    // let tag = false;
    // if(i > 100) {
    //     foodList = [];
    //     tag = true;
    //     fname++;
    //     i = 0;
    // }
    if(!g_tag) return;
    const data = foodList;
    foodList = [];
    fname ++;
    const fillname = './result/f'+ fname +'.json';
    fs.writeFile(fillname, JSON.stringify(data,"","\t"), 'utf8', (err)=>{
        if (err) throw err;
        g_tag = false;
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
        g_tag = (i % 50 == 0);
        if (i > len -1) {
            clearInterval(timer)
            g_tag = true;
            // saveAsJson(foodList,'./result/foodList.json');
        }
        
      }, 1000)
}

fs.readFile('./result/foodList.json','utf8', (err, data) => {
    if (err) throw err;
    urlList = JSON.parse(data);
    startReqBytime(urlList);
});
 
// for (let i = 1; i < 10; i++) {
    // const url = baseUrl;
    // startReq('https://yingyang.911cha.com./YWZ1.html');
// }
