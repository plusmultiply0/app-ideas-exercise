// 感觉应该用对象记录数据会好点。。。用es6时再试试
// 不用对象表示，浮点数无法计算，很难区分数字是属于谁的。

// 事件委托到按键的父元素上面---写完记得取消事件委托。
var getClickValue = document.getElementsByClassName('operationArea')[0];
// 设置当前输入显示的值：点击的数字就显示数字，点击的是操作符就显示 迄今为止的计算结果。
var setCurrentInput = document.getElementsByClassName('currentInput')[0];
var setHistoryShow = document.getElementsByClassName('historyShow')[0];

// 计算机思路，参考微软的计算器X，
// 感觉有问题--应该参考WYSIWYG思路，输入的数字和操作符组成的算数表达式代表了要运算的结果，
// 微软的计算器每次输入的数字和操作符都是针对 之前操作的结果而言的，显示的历史输入不代表计算式--仅仅是点击输入的历史记录。

// 根据“所见即所得”思路，那么就将中缀转化为后缀，后缀再计算结果即可！！！！！
// 后续思路需要变一下---
//                  ---点击操作符+-/* --会显示操作符，点击=会计算结果
//                  点击‘+/-’更改当前显示的正负，
//                  无输入时，点击. 会出现0开头小数，正常点击就是小数

// 全局变量，用来判断点击的按键的值
var numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+/-'];
var operatorArray = ['+', '-', 'x', '÷'];
var otherArray = ['AC','C','='];

var historyArray =[];

var tempValue = '0';

// 函数，绑定的点击事件--根据点击的是数字/操作符调用不同的函数
//                    -- 后续，应该会改--针对特定操作调用特定的函数/或者绑定不同的点击事件。
function judgeValue(event){
    console.log('1');
    var inputValue = event.target.childNodes[0].nodeValue;
    //  console.log(typeof inputValue);
    // console.log(event.target)
    // console.log(numArray.indexOf(inputValue));

    // 当按键为 numArray 和 操作符符时
    if(numArray.indexOf(inputValue)>-1||operatorArray.indexOf(inputValue)>-1){
        // 先进行预处理
        var tmp =  prevCurrentInput(inputValue);
        // 再根据不同的value 更改显示
        goonCurrentInput(tmp);
    }
    // 当输入为 AC/C/=时
    else if(otherArray.indexOf(inputValue)>-1){
        // 初始化--
        if(inputValue==='AC'){
            historyArray=[];
            tempValue='0';
            // 清空历史记录
            showHistory('');
            // 移除当前显示的输出
            goonCurrentInput('');
        }
        // 恢复为上一步
        else if(inputValue==='C'){
            // 当上部操作不是求结果时
            if(historyArray[historyArray.length-1]!=='='){
                // 从历史记录栈弹出上一步操作
                historyArray.pop();

                // 当回退使历史记录栈清空时，初始化
                if(historyArray.length==0){
                    tempValue='0';
                    showHistory('');
                    goonCurrentInput('');
                    return;
                }
                // 更新历史记录
                showHistory('');
                // 更新显示 为''/0
                tempValue='';
                goonCurrentInput('');
            }
            // 无法回退取 反运算---不符合栈的方法
            // 上步初始化，无需

            // 上步为取结果运算时，--=前面一定是数字
            else if (historyArray[historyArray.length - 1] === '='){
                // 弹出=
                historyArray.pop();
                // 更改当前显示为’0‘
                tempValue='0';
                goonCurrentInput('');
            }
        }
        // 取结果
        else if(inputValue==='='){
            showCalculated(inputValue);
        }
    }
    
    return ;
}

// 函数，处理点击的是数字按键的情况--目测只需将点击按键的值显示以及累计显示（多位数）就可以了？
function goonCurrentInput(value){

    tempValue = tempValue+value;
    // console.log(tempValue);
    // 更改显示
    newCurrent = document.createTextNode(tempValue);
    //  console.log(setCurrentInput);
    setCurrentInput.removeChild(setCurrentInput.firstChild);
    setCurrentInput.appendChild(newCurrent);
    // console.log('12');
    showHistory(value);
}



// 预处理函数------------------------数字  +/-  .  +-/*
function prevCurrentInput(value){
    // 过滤按键
    // 输入的数字--默认操作，点击操作符清空之前的显示，改为显示操作符。

    // 输入的是. 的情况
    // 输入的数字，以.开头
    if (value === '.') {
        // 若0开头（默认）/前一个为操作符/当前值仅为一个 -
        if(tempValue==='0'||operatorArray.indexOf(tempValue)>-1||tempValue==='-')
        {
            // 判断非初始输入时，前一个输入为0时，点击. 返回值即可
            if(historyArray.length!==0&&historyArray[historyArray.length-1]==='0'){
                return value;
            }
            tempValue = '';
            return '0.';
        }
        // 重复输入.
        if (tempValue.indexOf('.') > -1) {
            return '';
        }
        // 无特殊情况，返回当前值
        return value;
    }

    // 输入的是 +/- 的情况
    if (value === '+/-' ){
        // 前一个输入是操作符---只需后面输入的是数字/./ +/- 就可以
        // if(operatorArray.indexOf(tempValue)){}

        // 若当前的第一个字符是数字
        if (numArray.indexOf(tempValue[0])>-1){
            tempValue = '-' + tempValue;
        }
        // 第一个是 - 
        else if (tempValue[0] === '-'){
            tempValue = tempValue.slice(1);
        }
        // 当前current input为操作符 ---相当于将下次输入变号
        else if(operatorArray.indexOf(tempValue)>-1){
            tempValue='-';
        }
        return '';
    }
    
    // 输入为 +-/*
    if(operatorArray.indexOf(value)>-1){
        // 若上次输入为操作符 重复点击操作符替换符号
        if (operatorArray.indexOf(tempValue)>-1){
            tempValue='';
            // 清除上次输入
            historyArray.pop();
            return value;
        }
        else if(tempValue==='0.'){
            // 此时点击操作符会报错--应提示继续输入数字
            return '';
        }
        // 判断历史记录栈顶元素为 操作符时，点击应替换
        else if (operatorArray.indexOf(historyArray[historyArray.length - 1])>-1) {
            tempValue = '';
            // 清除上次输入
            historyArray.pop();
            return value;
        }
        // 若上次输入为数字，且不为. 清空上次的输入，并传入符号。
        tempValue='';
        return value;
    }

    // 当输入为 数字时0-9
    if(Number(value)<10&&Number(value)>-1){

        // 上次输入为 操作符时
        if(operatorArray.indexOf(tempValue)>-1){
            tempValue='';
            return value;
        }
        // 除0警告
        if (tempValue[tempValue.length - 1] ==='÷'&& Number(value)===0)
        {
            alert("You can't use 0 to divide other number!!!");
            // 返回空值
            return '';
        }
        // 因为默认值是‘0’,--第一次输入0(任意数)需要处理
        if(tempValue==='0'){
            tempValue='';
            return value;
        }
        // 无特殊情况，直接返回
        return value;
    }

}


// 函数，调用操作符的结果--先将点击本次操作符前的历史输入的数组（中缀表达式）------感觉应该不对？根据微软的计算器思路吗？
                    //    --调用函数将中缀转换为后缀--然后将后缀计算得出结果
                    //    --最后替换显示 
function showCalculated(value){

    var output = infixToPostfix();
    
    var finalValue = calculatPostfix(output);

    newCurrent = document.createTextNode(finalValue);
    setCurrentInput.removeChild(setCurrentInput.firstChild);
    setCurrentInput.appendChild(newCurrent);

    showHistory(value);
}

// 将中缀表达式转化为后缀表达式                                      //typeof Number(historyArray[i])==='number'逻辑错误，结果必true
function infixToPostfix(){
    var postFixStack = [];
    var output ='';
    for(var i=0;i<historyArray.length;i++){
        // 判断数字及 
        if(Number(historyArray[i])<10 && Number(historyArray[i])>-1 ){
            output=output+historyArray[i];
        }
        else{
            console.log(123);
            if(historyArray[i]==='+'|| historyArray[i]==='-'){
                while(postFixStack.length!==0){
                    output=output+postFixStack.pop();
                }
                console.log(4);
            }
            else if (historyArray[i] === 'x' || historyArray[i] === '÷'){
                
                while (postFixStack[postFixStack.length - 1] === 'x' || postFixStack[postFixStack.length - 1] ==='÷'){
                        output=output+postFixStack.pop();
                }
                console.log(5);
            }
            postFixStack.push(historyArray[i]);
            console.log('this is the postFixstack:'+postFixStack);
        }
    }
    // 遍历完后，postFixStack非空，将剩余的运算符加上
    if(postFixStack){
        /* 
        console.log(typeof postFixStack)
        console.log(postFixStack);
        console.log(postFixStack.length);
        postFixStack.pop();
        console.log(postFixStack.length);
         */
        
        while (postFixStack.length!==0) {
            
            console.log(postFixStack);
            output = output + postFixStack.pop();
        }
        
    }

    console.log('this is output of i2p: '+output);
    return output;
}

// 计算后缀表达式
function calculatPostfix(value){
    var tmpStack = [];
    var tmpValueOne=0,tmpValueTwo=0;
   console.log('this is the value(output):'+value);
    for(var i=0;i<value.length;i++){
        if (Number(value[i]) < 10 && Number(value[i]) > -1) {  //typeof Number(value[i])==='number' 判断错
            tmpStack.push(value[i]);
            console.log('this is tmpstack1:'+tmpStack);
        }
        else{
            switch(value[i]){
                case '+':
                    tmpValueOne=Number(tmpStack.pop());
                    tmpValueTwo = Number(tmpStack.pop());
                    tmpStack.push((tmpValueOne+tmpValueTwo).toString());
                    console.log('every operate result: '+tmpStack[tmpStack.length-1]);
                    break;
                case '-':
                    tmpValueOne = Number(tmpStack.pop());
                    tmpValueTwo = Number(tmpStack.pop());
                    tmpStack.push((tmpValueTwo - tmpValueOne).toString());
                    console.log('every operate result: ' + tmpStack[tmpStack.length - 1]);
                    break;
                case 'x':
                    tmpValueOne = Number(tmpStack.pop());
                    tmpValueTwo = Number(tmpStack.pop());
                    tmpStack.push((tmpValueOne * tmpValueTwo).toString());
                    console.log('every operate result: '+tmpStack[tmpStack.length-1]);
                    break;
                case '÷':
                    tmpValueOne = Number(tmpStack.pop());
                    tmpValueTwo = Number(tmpStack.pop());
                    tmpStack.push((tmpValueTwo / tmpValueOne).toString());
                    console.log('every operate result: '+tmpStack[tmpStack.length-1]);
                    break;
            }
        }
    }
    console.log('this is tmpstack[0]:'+tmpStack[0]);
    return tmpStack[0];
}

// 显示/更新历史输入的数字和操作符
function showHistory(value){
    if(value!==''){
        // 当前已输入0 避免重复0
        // console.log(historyArray[historyArray.length - 1] !== '0');
        // console.log(historyArray[historyArray.length - 1]);
        if(historyArray[historyArray.length-1]!=='0'||value!=='0')
        {
            historyArray.push(value);
        }
    }
    var tmphistory = document.createTextNode(historyArray.join(''));
    setHistoryShow.removeChild(setHistoryShow.firstChild);
    setHistoryShow.appendChild(tmphistory);

    console.log('this is historyArray:'+historyArray);
}

// 主函数 --封装
function main(){
    console.log('0');
    getClickValue.addEventListener('click',judgeValue);

}

main();