// 事件委托到按键的父元素上面---写完记得取消事件委托。
const getClickValue = document.getElementsByClassName('operationArea')[0];
// 设置当前输入显示的值：点击的数字就显示数字，点击的是操作符就显示 迄今为止的计算结果。
const setCurrentInput = document.getElementsByClassName('currentInput')[0];
const setHistoryShow = document.getElementsByClassName('historyShow')[0];

// 全局变量，用来判断点击的按键的值
const numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+/-'];
const operatorArray = ['+', '-', 'x', '÷'];
const otherArray = ['AC', 'C', '='];

let historyArray = [];

let tempValue = '';

// 按键分为3类，运算符、数字类、一般操作符

function CalculatValue() { };
// 定义存储的值、符号（+/-）、
CalculatValue.prototype.value = '';
CalculatValue.prototype.chara = '';

// 点击事件--用于获取按键的值
function judgeValue(event) {

    let inputValue = event.target.childNodes[0].nodeValue;

    // 当按键为 numArray 或 运算符时
    if (numArray.includes(inputValue) || operatorArray.includes(inputValue)) {
        // 新建/更改顶部对象的值
        newAObject(inputValue);
        // 更新输入显示
        showCurrentInput();
        // 更新历史记录
        showHistory();
    }

    // 当输入为 AC/C/=时
    else if (otherArray.includes(inputValue)) {
        if (inputValue === 'AC') {
            operatAC();
            
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
        if (operatorArray.includes(value) || otherArray.includes(value)) {
            return;
        }

        let newObject = new CalculatValue();
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
        let oldObject = historyArray[historyArray.length - 1];
        // 类型相同，都是运算符
        if (operatorArray.includes(oldObject.value)  && operatorArray.includes(value)) {
            // 更新值
            oldObject.value = value;

        }
        // 类型相同，都是数字类
        else if (!operatorArray.includes(oldObject.value) && !operatorArray.includes(value)) {
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
                return;
            }
            // 小数点
            if (value === '.') {
                if (oldObject.value.includes('.')) {
                    // 重复 略过
                    return;
                }
                else if (!oldObject.value.includes('.')) {
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
            oldObject.value = (oldObject.value + value).slice(0, 8);
        }
        // 类型不同，新建对象
        // 需要讨论特殊情况
        else {
            let newObject = new CalculatValue();
            // 新建入的值是 运算符
            if (operatorArray.includes(value)) {
                newObject.value = value;
            }
            // 新建入的是数字类
            else if (!operatorArray.includes(value)) {
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

    let newCurrent;
    // AC初始化
    if (equalValue === '0') {
        newCurrent = document.createTextNode(equalValue);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);
        return;
    }
    // 判断操作结果溢出
    if (equalValue === 'ERROR!') {
        newCurrent = document.createTextNode(equalValue);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);
        return;
    }

    // 特殊情况--利用参数有无，--计算结果
    if (equalValue) {
        newCurrent = document.createTextNode(equalValue.chara + equalValue.value);

        setCurrentInput.removeChild(setCurrentInput.firstChild);

        setCurrentInput.appendChild(newCurrent);

        return;
    }

    // 获取 历史记录 顶端的对象---即当前输入的值/运算符
    // 设置 ||'' 作为备用
    let valueObject = historyArray[historyArray.length - 1] || '';

    // 获取对应值 及 符号
    let value = valueObject.value || '';
    if (valueObject.chara === '-') {
        value = valueObject.chara + value;
    }

    newCurrent = document.createTextNode(value);

    setCurrentInput.removeChild(setCurrentInput.firstChild);

    setCurrentInput.appendChild(newCurrent);
}

// 每次操作后，更新历史输入记录
function showHistory(value) {

    if (value === 'empty') {
        
        let tmphistory = document.createTextNode('history input');
        
        setHistoryShow = document.getElementsByClassName('historyShow')[0];

        setHistoryShow.removeChild(setHistoryShow.firstChild);

        setHistoryShow.appendChild(tmphistory);

        return;
    }
    let tmpValue = '', i = 0;

    while (i < historyArray.length) {
        // 添加符号显示
        tmpValue = tmpValue + historyArray[i].chara + historyArray[i].value;
        i++;
    }
    
    let tmphistory = document.createTextNode(tmpValue);
   
    setHistoryShow.removeChild(setHistoryShow.firstChild);
    
    setHistoryShow.appendChild(tmphistory);
   
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

    let tmpObject = historyArray[historyArray.length - 1];

    if (!tmpObject) {
        // 清空显示的值
        showCurrentInput('0');
        // 清空历史记录
        showHistory('empty');
    }

    // 判断上一步的值
    // 如果是 运算符  --短路求值
    if (tmpObject && (operatorArray.includes(tmpObject.value))) {
        historyArray.pop();
        showCurrentInput();
    }
    // 如果是 数字类--短路求值--判断是数字
    // 好像还是无法实现 取反的回复
    else if (tmpObject && (numArray.includes(tmpObject.value[0]))) {
        tmpObject.value = tmpObject.value.slice(0, tmpObject.value.length - 1);
        if (!tmpObject.value) {
            historyArray.pop();
        }
        showCurrentInput();
    }
    // 需要讨论上步为 取结果运算的情况
}

function operatEqual() {
    // 取 历史记录栈 里结果运算、展示
    let tmp, valueObject;
    // 若最后一位为符号位，不响应---短路求值，长度为0时忽略
    if (historyArray.length && (operatorArray.includes(historyArray[historyArray.length - 1].value))) {
        return;
    }

    tmp = infixToPostfix();
    valueObject = calculatPostfix(tmp);

    // 操作结果大于8位数，显示ERR
    if ((!valueObject.value.includes('.')) && valueObject.value.length > 8) {
        alert('The result of the operation more the largest number that can be displayed!');
        showCurrentInput('ERROR!');
        return;
    }
    // 小数点后保留3位
    else if (valueObject.value.includes('.') && valueObject.value.length > 8) {
        let tmp = valueObject.value.indexOf('.');
        valueObject.value = valueObject.value.slice(0, tmp) + valueObject.value.slice(tmp, tmp + 4);
    }
    // 更新显示
    showCurrentInput(valueObject);
    // 更新历史记录
    showHistory();
}

// 将中缀表达式转换为后缀表达式
// ---------------------------需判断对象存在否--避免报错
function infixToPostfix() {
    let postFixStack = [];
    let outputStack = [];

    for (let i = 0; i < historyArray.length; i++) {
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
                while ((postFixStack[postFixStack.length - 1]) && (postFixStack[postFixStack.length - 1].value === 'x' || postFixStack[postFixStack.length - 1].value === '÷')) {
                    outputStack.push(postFixStack.pop());
                    // 判断对象存在否--避免报错
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

    let i = 0, newOutputStack = [];
    while (i < outputStack.length) {
        let nObject = new CalculatValue();
        nObject.value = outputStack[i].value;
        nObject.chara = outputStack[i].chara;
        newOutputStack.push(nObject);
        i++;
    }

    return newOutputStack;
}

function calculatPostfix(value) {
    let tmpStack = [];
    let tmpObjectOne, tmpObjectTwo;
    for (let i = 0; i < value.length; i++) {
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
                    tmpObjectOne.value = (Number(tmpObjectOne.chara + tmpObjectOne.value) + Number(tmpObjectTwo.chara + tmpObjectTwo.value)).toString();
                    // 将符号设为chara值
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
                case '-':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    
                    tmpObjectOne.value = (Number(tmpObjectTwo.chara + tmpObjectTwo.value) - Number(tmpObjectOne.chara + tmpObjectOne.value)).toString();
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
                    tmpObjectOne.value = (Number(tmpObjectOne.chara + tmpObjectOne.value) * Number(tmpObjectTwo.chara + tmpObjectTwo.value)).toString();
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
                case '÷':
                    tmpObjectOne = tmpStack.pop();
                    tmpObjectTwo = tmpStack.pop();
                    tmpObjectOne.value = (Number(tmpObjectTwo.chara + tmpObjectTwo.value) / Number(tmpObjectOne.chara + tmpObjectOne.value)).toString();
                    if (tmpObjectOne.value[0] === '-') {
                        tmpObjectOne.chara = '-';
                        tmpObjectOne.value = tmpObjectOne.value.slice(1, tmpObjectOne.value.length);
                    }
                    tmpStack.push(tmpObjectOne);
                    break;
            }
        }

    }
    return tmpStack[0];
}

// 主函数 --封装
function main() {
    getClickValue.addEventListener('click', judgeValue);
}

main();