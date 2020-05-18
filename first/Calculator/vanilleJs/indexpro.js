// 前车之鉴
// 使用对象来定义数据结构

// 事件委托到按键的父元素上面---写完记得取消事件委托。
var getClickValue = document.getElementsByClassName('operationArea')[0];
// 设置当前输入显示的值：点击的数字就显示数字，点击的是操作符就显示 迄今为止的计算结果。
var setCurrentInput = document.getElementsByClassName('currentInput')[0];
var setHistoryShow = document.getElementsByClassName('historyShow')[0];

// 全局变量，用来判断点击的按键的值
var numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+/-'];
var operatorArray = ['+', '-', 'x', '÷'];
var otherArray = ['AC', 'C', '='];

var historyArray = [];

var tempValue = '';

// 按键分为3类，运算符、数字类、一般操作符

function CalculatValue() { };
// 定义存储的值、符号（+/-）、
CalculatValue.prototype.value = '';
CalculatValue.prototype.chara = '';
// CalculatValue.prototype.tag = '';

// 何时新建对象？以及怎么样算结束一个对象的运算
// 根据historyArray--空的，新建对象--赋值后打入数组
// 结束/新建一个对象？
// 判断历史记录最新的对象的值类型是否和新的值相同，相同操作同一个对象；不同就新建对象


// 点击事件--用于获取按键的值
function judgeValue(event) {

    var inputValue = event.target.childNodes[0].nodeValue;

    // 当按键为 numArray 或 运算符时
    if (numArray.indexOf(inputValue) > -1 || operatorArray.indexOf(inputValue) > -1) {
        // 新建/更改顶部对象的值
        newAObject(inputValue);
        // 更新输入显示
        showCurrentInput();
        // 更新历史记录
        showHistory();
    }

    // 当输入为 AC/C/=时
    else if (otherArray.indexOf(inputValue) > -1) {
        if (inputValue === 'AC') {
            operatAC();
            // 更新历史记录
            // showHistory();
        }
        else if (inputValue === 'C') {
            operatC();
            // 更新历史记录
            showHistory();
        }
        else if (inputValue === '=') {
            operatEqual();
        }
    }

    return;
}

// 处理输入为数字类/运算符的情况，
function newAObject(value) {
    // 第一个对象创建
    if (historyArray.length === 0) {
        // 确保第一个输入的值是数字类
        if (operatorArray.indexOf(value) > -1 || otherArray.indexOf(value) > -1) {
            return;
        }

        var newObject = new CalculatValue();
        // newObject.tag='number';

        if (Number(value) < 10 || Number(value) > -1) {
            newObject.value = value;
        }
        else if (value === '+/-') {
            newObject.chara = '-';
        }
        else if (value === '.') {
            newObject.value = '0.';
        }

        historyArray.push(newObject);
    }
    // 第二个以后对象创建
    else {
        var oldObject = historyArray[historyArray.length - 1];
        // 类型相同，都是运算符
        if (operatorArray.indexOf(oldObject.value) > -1 && operatorArray.indexOf(value) > -1) {
            // 更新值
            oldObject.value = value;

        }
        // 类型相同，都是数字类
        else if (operatorArray.indexOf(oldObject.value) === -1 && operatorArray.indexOf(value) === -1) {
            // 值合并
            // 需要讨论特殊情况
            // 符号转换
            // 暂时不对计算结果操作--
            if (value === '+/-') {
                if (oldObject.chara === '-') {
                    oldObject.chara = '';
                }
                else if (oldObject.chara === '') {
                    oldObject.chara = '-';
                }
                console.log(oldObject);
                return;
            }
            // 小数点
            if (value === '.') {
                if (oldObject.value.indexOf('.') > -1) {
                    // 重复 略过
                    return;
                }
                else if (oldObject.value.indexOf('.') === -1) {
                    // 不重复--默认情况
                    // oldObject.value = oldObject.value + '.';
                }
            }
            // 0
            if (value === '0') {
                if (oldObject.value === '0') {
                    // 重复0无意义，略过
                    return;
                }
            }
            // 无特殊情况，值合并
            // 单个数字最大位数小于8位，大于忽略
            oldObject.value = (oldObject.value + value).slice(0,8);
            // 小数位数<5
            // if ((oldObject.value).indexOf('.') > -1) { oldObject.value = (oldObject.value + value).slice(0, 8);}
            console.log(oldObject);
        }
        // 类型不同，新建对象
        // 需要讨论特殊情况
        else {
            var newObject = new CalculatValue();
            // 新建入的值是 运算符
            if (operatorArray.indexOf(value) > -1) {
                newObject.value = value;
            }
            // 新建入的是数字类
            else if (operatorArray.indexOf(value) === -1) {
                if (Number(value) < 10 || Number(value) > -1) {
                    newObject.value = value;
                }
                else if (value === '+/-') {
                    newObject.chara = '-';
                }
                else if (value === '.') {
                    newObject.value = '0.';
                }
            }
            // 新对象推入historyArray
            historyArray.push(newObject);
        }
    }
}

// 更新（currentInput) 显示的值
function showCurrentInput(equalValue) {

    var newCurrent;
    // AC初始化
    if(equalValue==='0'){
        newCurrent = document.createTextNode(equalValue);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);
        return;
    }
    // 判断操作结果溢出
    if (equalValue ==='ERROR!'){
        newCurrent = document.createTextNode(equalValue);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);
        return ;
    }

    // 特殊情况--利用参数有无，--计算结果
    if (equalValue) {
        newCurrent = document.createTextNode(equalValue.chara+equalValue.value);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);

        return;
    }
    // ----------------

    // 获取 历史记录 顶端的对象---即当前输入的值/运算符
    // 设置 ||'' 作为备用
    var valueObject = historyArray[historyArray.length - 1] || '';

    // 获取对应值 及 符号
    var value = valueObject.value || '';
    if (valueObject.chara === '-') {
        value = valueObject.chara + value;
    }

    newCurrent = document.createTextNode(value);

    setCurrentInput.removeChild(setCurrentInput.firstChild);

    setCurrentInput.appendChild(newCurrent);

    // showHistory(value);
}

// 每次操作后，更新历史输入记录
function showHistory(value) {
    
    if(value==='empty'){
        // console.log(value);
        var tmphistory = document.createTextNode('history input');
        // console.log(tmphistory);
        // console.log(setHistoryShow);
        setHistoryShow = document.getElementsByClassName('historyShow')[0];

        setHistoryShow.removeChild(setHistoryShow.firstChild);
        
        setHistoryShow.appendChild(tmphistory);

        return;
    }
    

    var tmpValue = '', i = 0;

    while (i < historyArray.length) {
        // 添加符号显示
        tmpValue = tmpValue +historyArray[i].chara+historyArray[i].value;
        i++;
    }
    // console.log(tmpValue);
    var tmphistory = document.createTextNode(tmpValue);
    /*
    else {
        var tmphistory = '';
    }*/
    setHistoryShow.removeChild(setHistoryShow.firstChild);
    // console.log(tmphistory);
    setHistoryShow.appendChild(tmphistory);
    // console.log(tmphistory);
}


// 三个函数--分别处理AC/C/=的情况
function operatAC() {
    // 清空历史记录
    historyArray = [];
    tempValue = '';
    // 清空显示的值
    showCurrentInput('0');
    // 清空历史记录
    showHistory('empty');
    // console.log('ok');
}

function operatC() {

    var tmpObject = historyArray[historyArray.length - 1];

    if(!tmpObject){
        // 清空显示的值
        showCurrentInput('0');
        // 清空历史记录
        showHistory('empty');
    }
    
    // 判断上一步的值
    // 如果是 运算符  --短路求值
    if (tmpObject&&(operatorArray.indexOf(tmpObject.value) > -1)) {
        historyArray.pop();
        showCurrentInput();
    }
    // 如果是 数字类--短路求值--判断是数字
    // 好像还是无法实现 取反的回复
    else if (tmpObject&&(numArray.indexOf(tmpObject.value[0]) > -1)) {
        tmpObject.value = tmpObject.value.slice(0, tmpObject.value.length - 1);
        if(!tmpObject.value){
            historyArray.pop();
        }
        showCurrentInput();
    }
    // 需要讨论上步为 取结果运算的情况
}

function operatEqual() {
    // 取 历史记录栈 里结果运算、展示
    var tmp, valueObject;
    // 若最后一位为符号位，不响应---短路求值，长度为0时忽略
    if(historyArray.length&&(operatorArray.indexOf(historyArray[historyArray.length-1].value)>-1)){
        return ;
    }

    tmp = infixToPostfix();
    valueObject = calculatPostfix(tmp);

    // 操作结果大于8位数，显示ERR
    if((valueObject.value.indexOf('.')===-1)&&valueObject.value.length>8){
        alert('The result of the operation more the largest number that can be displayed!');
        showCurrentInput('ERROR!');
        return;
    }
    // 小数点后保留3位
    else if ((valueObject.value.indexOf('.') > -1) && valueObject.value.length > 8){
        var tmp = valueObject.value.indexOf('.');
        valueObject.value=valueObject.value.slice(0,tmp)+valueObject.value.slice(tmp,tmp+4);
    }
    // 更新显示
    showCurrentInput(valueObject);
    // 更新历史记录
    showHistory();
}

// 将中缀表达式转换为后缀表达式
// ---------------------------需判断对象存在否--避免报错
function infixToPostfix() {
    var postFixStack = [];
    var outputStack = [];

    for (var i = 0; i < historyArray.length; i++) {
        // 判断数字--需要区分多位整数
        if (Number(historyArray[i].value[0]) < 10 && Number(historyArray[i].value[0]) > -1) {
            outputStack.push(historyArray[i]);
        }
        else {

            if (historyArray[i].value === '+' || historyArray[i].value === '-') {
                while (postFixStack.length !== 0) {
                    outputStack.push(postFixStack.pop());
                }
            }

            else if (historyArray[i].value === 'x' || historyArray[i].value === '÷') {
                // 判断对象存在否--避免报错
                // if (!postFixStack[postFixStack.length - 1]){break;}
                console.log(postFixStack[postFixStack.length - 1]);
                // if (postFixStack[postFixStack.length - 1] != undefined) 
                    while ((postFixStack[postFixStack.length - 1])&&(postFixStack[postFixStack.length - 1].value === 'x' || postFixStack[postFixStack.length - 1].value === '÷')) {
                        outputStack.push(postFixStack.pop());
                        // 判断对象存在否--避免报错
                        // if (postFixStack[postFixStack.length - 1] == undefined){break;}
                    }
            }
            // 符合运算符优先级
            postFixStack.push(historyArray[i]);
        }
    }
    // 遍历完后，postFixStack非空，将剩余的运算符加上
    if (postFixStack) {
        while (postFixStack.length !== 0) {
            outputStack.push(postFixStack.pop());
        }
    }
    // 前面获取的是historyArray数组内对象的重排序数组。
    // 引用没有发生改变--重新生成对象--避免错误引用

    var i = 0,newOutputStack=[];
    while (i < outputStack.length) {
        console.log(outputStack[i]);
        var nObject = new CalculatValue();
        nObject.value=outputStack[i].value;
        nObject.chara=outputStack[i].chara;
        newOutputStack.push(nObject);
        i++;
    }

    return newOutputStack;
}

// 计算后缀表达式
function calculatPostfix(value) {
    var tmpStack = [];
    var tmpObjectOne, tmpObjectTwo;
    for (var i = 0; i < value.length; i++) {
        // 判断为数字就压入栈，数值范围有限---存在多位整数，所以就取第一位的字符判断--范围一定在0-9内
        if (Number(value[i].value[0]) < 10 && Number(value[i].value[0]) > -1) {
            tmpStack.push(value[i]);
        }
        else {
            switch (value[i].value) {
                case '+':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    // 添加符号显示
                    tmpObjectOne.value = (Number(tmpObjectOne.chara+tmpObjectOne.value) + Number(tmpObjectTwo.chara+ tmpObjectTwo.value)).toString();
                    // 将符号设为chara值
                    if(tmpObjectOne.value[0]==='-'){
                        tmpObjectOne.chara='-';
                        tmpObjectOne.value=tmpObjectOne.value.slice(1,tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
                case '-':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    // console.log(tmpObjectTwo);
                    // console.log(tmpObjectOne);
                    // console.log(tmpObjectOne.value)
                    // console.log(tmpObjectTwo.value);
                    // console.log(Number(tmpObjectOne.value) + Number(tmpObjectTwo.value));
                    tmpObjectOne.value = (Number(tmpObjectTwo.chara +tmpObjectTwo.value) - Number(tmpObjectOne.chara +tmpObjectOne.value)).toString();
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
                case 'x':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    console.log(tmpObjectOne);
                    console.log(tmpObjectTwo);
                    tmpObjectOne.value = (Number(tmpObjectOne.chara + tmpObjectOne.value) * Number(tmpObjectTwo.chara +tmpObjectTwo.value)).toString();
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
                case '÷':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    tmpObjectOne.value = (Number(tmpObjectTwo.chara +tmpObjectTwo.value) / Number(tmpObjectOne.chara +tmpObjectOne.value)).toString();
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
            }
        }

    }
    console.log(historyArray[historyArray.length-1]);
    console.log(tmpStack[0]);
    return tmpStack[0];
}

// 主函数 --封装
function main() {
    // console.log('0');
    getClickValue.addEventListener('click', judgeValue);

}

main();