var getShape = document.getElementsByClassName('showpic')[0];
// console.log(getShape);
// get the list value
var getlist = document.getElementsByTagName('ul')[0];
// console.log(getlist);
// get input
var getinputlist = getlist.getElementsByTagName('input');
// console.log(getinputlist);

var brValue='';
var inputunit = 'px';

var getUnit = document.getElementsByClassName('unit')[0];
// console.log(getUnit)

// output CSS
var output = 'border-radius: ' + brValue + ';'

var getOutputArea = document.getElementsByClassName('forOutput')[0];
var getCopy = getOutputArea.getElementsByTagName('button')[0];
var showCss = getOutputArea.getElementsByTagName('div')[0];


function changeBorderRadius(){
    var getlist = document.getElementsByTagName('ul')[0];
    console.log(getlist);
    // get the exact input value
    var gettlfirst = getlist.getElementsByClassName('tlfirst')[0].value;
    // console.log(gettlfirst)
    var gettlsecond = getlist.getElementsByClassName('tlsecond')[0].value;
    // console.log(gettlsecond)
    var gettrfirst = getlist.getElementsByClassName('trfirst')[0].value;
    // console.log(gettrfirst)
    var gettrsecond = getlist.getElementsByClassName('trsecond')[0].value;
    // console.log(gettrsecond)
    var getbrfirst = getlist.getElementsByClassName('brfirst')[0].value;
    // console.log(getbrfirst)
    var getbrsecond = getlist.getElementsByClassName('brsecond')[0].value;
    // console.log(getbrsecond)
    var getblfirst = getlist.getElementsByClassName('blfirst')[0].value;
    // console.log(getblfirst)
    var getblsecond = getlist.getElementsByClassName('blsecond')[0].value;
    // console.log(getblsecond)
    // 
    brValue = gettlfirst.toString() + inputunit + ' ' + gettrfirst.toString() + inputunit + ' ' + getbrfirst.toString() + inputunit + ' ' + getblfirst.toString() + inputunit + ' / ' + gettlsecond.toString() + inputunit + ' ' + gettrsecond.toString() + inputunit + ' ' + getbrsecond.toString() + inputunit + ' ' + getblsecond.toString()+inputunit;
    getShape.style.borderRadius=brValue;

    console.log(brValue);
    setCopyOutput();
}

// 更换单位需要触发变形才行
function changeUnit(e){
   
    if(inputunit === 'px'){
        inputunit='%';
        e.target.removeChild(e.target.childNodes[0]);
        e.target.appendChild(document.createTextNode('Unit: % ( click to change unit to px )'));
        changeBorderRadius();
    }
    else if(inputunit === '%'){
        inputunit='px';
        // e.target.childNodes[0] = 'Unit: Px (click to change the px to %)';
        e.target.removeChild(e.target.childNodes[0]);
        e.target.appendChild(document.createTextNode('Unit: px ( click to change unit to % )'));
        changeBorderRadius();
    }
    // console.log(e.target.childNodes[0])
    // console.log(inputunit)
    setCopyOutput();
    e.preventDefault();
}

// 设置输出的CSS
function setCopyOutput(){
    output = 'border-radius: ' + brValue + ';';
    showCss.removeChild(showCss.childNodes[0]);
    showCss.appendChild(document.createTextNode(output));
}

// 设置输出到剪贴板
function getOutputCss(e){
    console.log(output);
    navigator.clipboard.writeText(output).then(function(){alert('Copied Successfully!')},function(){alert('Copied Failed!')});
    e.preventDefault();
}


function main(){
    for(var i=0;i<getinputlist.length;i++){
        getinputlist[i].addEventListener('keyup',changeBorderRadius);
    }
    getUnit.addEventListener('click',changeUnit);
    getCopy.addEventListener('click',getOutputCss);
}

main();