// global variable
let brValue = '';
let inputunit = 'px';

// output CSS
let output = 'border-radius: ' + brValue + ';'

const getOutputArea = document.getElementsByClassName('forOutput')[0];
const getCopy = getOutputArea.getElementsByTagName('button')[0];
const showCss = getOutputArea.getElementsByTagName('div')[0];

// 实时更改示例正方形
function changeBorderRadius() {
    const getShape = document.getElementsByClassName('showpic')[0];
    let getlist = document.getElementsByTagName('ul')[0];

    // get the exact input value
    let gettlfirst = getlist.getElementsByClassName('tlfirst')[0].value;
    let gettlsecond = getlist.getElementsByClassName('tlsecond')[0].value;
    let gettrfirst = getlist.getElementsByClassName('trfirst')[0].value;
    let gettrsecond = getlist.getElementsByClassName('trsecond')[0].value;

    let getbrfirst = getlist.getElementsByClassName('brfirst')[0].value;
    let getbrsecond = getlist.getElementsByClassName('brsecond')[0].value;
    let getblfirst = getlist.getElementsByClassName('blfirst')[0].value;
    let getblsecond = getlist.getElementsByClassName('blsecond')[0].value;
    // 
    brValue = `${gettlfirst}${inputunit} ${gettrfirst}${inputunit} ${getbrfirst}${inputunit} ${getblfirst}${inputunit} / ${gettlsecond}${inputunit} ${gettrsecond}${inputunit} ${getbrsecond}${inputunit} ${getblsecond}${inputunit}`;
    getShape.style.borderRadius = brValue;

    setCopyOutput();
}

// 设置输出的CSS
function setCopyOutput() {
    output = 'border-radius: ' + brValue + ';';
    showCss.removeChild(showCss.childNodes[0]);
    showCss.appendChild(document.createTextNode(output));
}


function main() {
    const getUnit = document.getElementsByClassName('unit')[0];

    // get the list value
    const getlist = document.getElementsByTagName('ul')[0];

    // get input
    const getinputlist = getlist.getElementsByTagName('input');

    for (let i = 0; i < getinputlist.length; i++) {
        getinputlist[i].addEventListener('keyup', changeBorderRadius);
    }

    // 变换单位
    // 更换单位需要触发变形才行
    getUnit.addEventListener('click', (e) => {

        if (inputunit === 'px') {
            inputunit = '%';
            e.target.removeChild(e.target.childNodes[0]);
            e.target.appendChild(document.createTextNode('Unit: % ( click to change unit to px )'));
            changeBorderRadius();
        }
        else if (inputunit === '%') {
            inputunit = 'px';

            e.target.removeChild(e.target.childNodes[0]);
            e.target.appendChild(document.createTextNode('Unit: px ( click to change unit to % )'));
            changeBorderRadius();
        }

        setCopyOutput();
        e.preventDefault();
    });

    // 设置输出到剪贴板
    getCopy.addEventListener('click', (e) => {
        navigator.clipboard.writeText(output).then(() => alert('Copied Successfully!'), () => alert('Copied Failed!'));
        e.preventDefault();
    });
}

main();