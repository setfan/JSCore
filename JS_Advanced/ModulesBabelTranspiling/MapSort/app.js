let mapSort = require('./sortMap');


let map = new Map();
map.set(3,{age:13,hoby:"Skiing"});
map.set(1,{name:"Stamat",age:29,color:"blue"});
map.set(7,{name:"Yordan",age:3});
let sortedMap = mapSort(map,(a,b)=>a[1].age - b[1].age);
console.log(sortedMap);
//result.mapSort = mapSort;