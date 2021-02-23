function fun1(param) {
    let dom = document.getElementById('app');
    dom.innerText = `hello ${param}`;
}

module.exports = fun1;