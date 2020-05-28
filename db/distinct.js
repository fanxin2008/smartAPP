


//不在node下运行
var duplicates=[];

db.foods.aggregate([
    {
        $group: {
            _id:{_id:'$name'},
            dups:{"$addToSet":"$_id"},
            count:{"$sum":1}
        }
    },
    {
        $match:{
            count:{"$gt":1}
        }
    }
],
{
    allowDiskUse:true 
}).forEach(doc => {
    doc.dups.shift();
    doc.dups.forEach(ele =>{
        duplicates.push(ele);
    })
});
printjson({length:duplicates.length});
db.foods.remove({_id:{$in:duplicates}});
