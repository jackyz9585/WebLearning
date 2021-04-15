// 这一个对象发生了改变后，会自动通知其他订阅该对象的其他对象，做出对应的行为，这种模式叫做观察者模式，一种行为模式

class Observer{
    constructor(){
        this.handlerFun = {};
    }

    // 添加监听事件类型及行为
    add(type,fn){
        if(type==undefined||fn==undefined){
            throw new Error('需要事件类型type和事件fn');
        }
        // 判断有无监听该类型的事件
        if(this.handlerFun[type]){
            // 判断有无监听该事件
            if(this.handlerFun[type].indexOf(fn) === -1){
                this.handlerFun[type].push(fn);
            }else{
                return
            }
        }else{
            this.handlerFun[type] = [fn];
        }
    };

    // 触发事件
    emit(type,...fn){
        if(type == undefined){
            throw new Error('需要事件类型type')
        }
        // 判断有无fn传入
        try {
            if(fn.length==0){
                for(let v of this.handlerFun[type]){
                    v();
                }
            }else{
                let event = fn;
                console.log(event);
                for(let v of this.handlerFun[type]){
                    if(event.includes(v)){
                        v();
                    }
                }
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // 删除事件
    remove(type,...fn){
        if(type == undefined){
            throw new Error('需要事件类型type')
        }
        try {
            if(fn.length==0){
                delete this.handlerFun[type]
            }else{
                let event = fn;
                for(let v of event){
                    let index = this.handlerFun[type].indexOf(v);
                    if(index>-1){
                        tar.splice(index,1);
                    }
                }
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // 一次触发
    once(type,...fn){
        this.emit(type,fn) ? this.remove(type,fn) : null;
    }
}


let pub = new Observer();

let test = ()=>{console.log(123);}
pub.add('try',test);
pub.emit('try');
pub.remove('try');
pub