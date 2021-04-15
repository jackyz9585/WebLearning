let obj = {
    k1:'v1',
    k2:{
        k21:'v21',
        k22:['v221','v222','v223'],
        k23:{
            k231:'v231',
            k232:'v232'
        }
    }
}

// 浅拷贝
let shallow1 = Object.assign(obj);
let shallow2 = Array.prototype.slice(0);
let shallow3 = Array.prototype.concat();

// 深拷贝
let deep1 = JSON.parse(JSON.stringify(obj));
console.log(obj.k2.k23.k231,deep1.k2.k23.k231);//v231 v231
console.log(obj.k2.k22[0],deep1.k2.k22[0]);//v221 v221
deep1.k2.k23.k231 = 'new v231'
deep1.k2.k22[0] = 'new v221'
console.log(obj.k2.k23.k231,deep1.k2.k23.k231);//v231 new v231
console.log(obj.k2.k22[0],deep1.k2.k22[0]);//v221 new v221

function deepCopy(obj) {
    let deepObj = obj instanceof Object ? {} : [];
    if(obj && typeof obj === 'object'){
        for(let key in obj){
            if(obj[key] && typeof obj[key] === 'object'){
                deepObj[key] = deepCopy(obj[key]);
            }else{
                deepObj[key] = obj[key];
            }
        }
    }
    return deepObj
}

let deep2 = deepCopy(obj);
console.log(obj.k2.k23.k231,deep2.k2.k23.k231);//v231 v231
console.log(obj.k2.k22[0],deep2.k2.k22[0]);//v221 v221
deep2.k2.k23.k231 = 'new v231';
deep2.k2.k22[0] = 'new v221'
console.log(obj.k2.k23.k231,deep2.k2.k23.k231);//v231 new v231
console.log(obj.k2.k22[0],deep1.k2.k22[0]);//v221 new v221

