var getInput = document.getElementById('bnum');
var setOutput=document.getElementsByTagName('output')[0];
var state='';
var originstate;
function Bin2Dec(props){
    let sum=0;
    let tmp = 0;
    if(!props){
        return;
    }
    if (props[props.length - 1] != '0' && props[props.length - 1] != '1'){
        getInput.value=originstate;
        props=originstate;
        alert('you should only input 0 or 1 !');
    }
    else if (props.length > 8) {
        alert('you should input less than 8 digits!');
        props= props.slice(0,8);
        getInput.value = getInput.value.slice(0,8);
    }

    for(let char of props){
        tmp++;
        
        if(char!='0'){
            sum+=Math.pow(2,props.length-tmp);
        }
    }
    state = sum;
    originstate=props;
    return sum;
}
getInput.oninput = function (){
    let toDec = Bin2Dec(getInput.value);
    setOutput.value = toDec;
    if (!getInput.value){
        setOutput.value='';
    }
    // console.log(toDec);
}