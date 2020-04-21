const getInput = document.getElementById('bnum');
const setOutput=document.getElementsByTagName('output')[0];

// to save last input string
let originstate='';
//use es6

function Bin2Dec(props){
    let sum=0;
    let tmp = 0;
    // emtyp input
    if(!props){
        return;
    }
    // judge the lastest input number to be 0 or 1
    else if (props[props.length - 1] != '0' && props[props.length - 1] != '1'){
        props = props.slice(0, props.length-1);
        getInput.value = props;
        alert('you should only input 0 or 1 !');
    }
    // let input less than 8 character
    else if (props.length > 8) {
        alert('you should input less than 8 digits!');
        props= props.slice(0,8);
        getInput.value = getInput.value.slice(0,8);
    }
    // calculate to equivalent dec number
    for(let char of props){
        tmp++;
        if(char!='0'){
            sum+=Math.pow(2,props.length-tmp);
        }
    }
    originstate=props;
    return sum;
}

getInput.oninput = ()=>{
    let toDec = Bin2Dec(getInput.value);
    setOutput.value = toDec;
    if (!getInput.value) {
        setOutput.value = '';
    }
}
