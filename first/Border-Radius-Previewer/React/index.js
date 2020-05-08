/* 
components structure should be:
BRadiusPreviewer
    --OperateArea
        --EditArea
        --OutputArea
    --ShowArea
 */

class BRadiusPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'px',
            unitBool: true,
            tlRadiusFirst: '0',
            tlRadiusSecond: '0',
            trRadiusFirst: '0',
            trRadiusSecond: '0',
            brRadiusFirst: '0',
            brRadiusSecond: '0',
            blRadiusFirst: '0',
            blRadiusSecond: '0',
        };
        this.valueChange = this.valueChange.bind(this);
        this.unitChange = this.unitChange.bind(this);
        this.getOutput = this.getOutput.bind(this);
    }
    // 监测输入框的值
    valueChange(e) {

        const targetInput = e.target.id;
        let inputValue = e.target.value;
        let inputName = '';
        // console.log(targetInput)
        switch (targetInput) {
            case 'a':
                inputName = 'tlRadiusFirst';
                break;
            case 'b':
                inputName = 'trRadiusFirst';
                break;
            case 'c':
                inputName = 'brRadiusFirst';
                break;
            case 'd':
                inputName = 'blRadiusFirst';
                break;
            case 'e':
                inputName = 'tlRadiusSecond';
                break;
            case 'f':
                inputName = 'trRadiusSecond';
                break;
            case 'g':
                inputName = 'brRadiusSecond';
                break;
            case 'h':
                inputName = 'blRadiusSecond';
                break;
        }
        this.setState({ [inputName]: inputValue });
        // e.target.focus();
        // console.log({ [inputName]: inputValue })
    }
    // 修改单位
    unitChange() {
        let currentUnit = this.state.unitBool ? '%' : 'px';
        let currenBool = !this.state.unitBool;
        // console.log(currenBool);
        // console.log(currentUnit);
        this.setState({
            unit: currentUnit,
            unitBool: currenBool,
        });
    }
    // 复制CSS到剪贴板
    getOutput() {
        const value = this.state;
        const output = `border-radius: ${value.tlRadiusFirst}${value.unit} ${value.trRadiusFirst}${value.unit} ${value.brRadiusFirst}${value.unit} ${value.blRadiusFirst}${value.unit} / ${value.tlRadiusSecond}${value.unit} ${value.trRadiusSecond}${value.unit} ${value.brRadiusSecond}${value.unit} ${value.blRadiusSecond}${value.unit};`;
        navigator.clipboard.writeText(output).then(() => alert('Copied Successfully!'), () => alert('Copied Failed!'));
    }

    render() {
        let value = this.state;
        return (
            <div>
                <div>Border-radius Previewer</div>
                <div className='workArea'>
                    <OperateArea value={value} valueChange={this.valueChange} unitChange={this.unitChange} getOutput={this.getOutput} />
                    <ShowArea value={value} />
                </div>
            </div>
        );
    }
}

function OperateArea(props) {
    const value = props.value;
    const valueChange = props.valueChange;
    const unitChange = props.unitChange;
    const getOutput = props.getOutput;
    return (
        <div className='operateArea'>
            <EditArea value={value} valueChange={valueChange} unitChange={unitChange} />
            <OutputArea value={value} getOutput={getOutput} />
        </div>
    );
}

function ShowArea(props) {
    const value = props.value
    let borderStyle = `${value.tlRadiusFirst}${value.unit} ${value.trRadiusFirst}${value.unit} ${value.brRadiusFirst}${value.unit} ${value.blRadiusFirst}${value.unit} / ${value.tlRadiusSecond}${value.unit} ${value.trRadiusSecond}${value.unit} ${value.brRadiusSecond}${value.unit} ${value.blRadiusSecond}${value.unit}`;
    return (
        // style需修改
        <div className='showpic' style={{ borderRadius: borderStyle }}></div>
    );
}

function EditArea(props) {
    let i = 0;
    const iarray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const value = props.value;
    const valueChange = props.valueChange;
    const unitChange = props.unitChange;

    let horizonalValue = [value.tlRadiusFirst, value.trRadiusFirst, value.brRadiusFirst, value.blRadiusFirst];
    let verticalValue = [value.tlRadiusSecond, value.trRadiusSecond, value.brRadiusSecond, value.blRadiusSecond];
    return (
        <div className='inputArea'>
            <button onClick={unitChange}>{value.unitBool ? 'Unit: px ( click to change unit to % )' : 'Unit: % ( click to change unit to px )'}</button>
            <div>
                <div>
                    <div>border-top-left-radius:</div>
                    <div>border-top-right-radius:</div>
                    <div>border-bottom-right-radius:</div>
                    <div>border-bottom-left-radius:</div>
                </div>
                <div>
                    <div>horizonal radius</div>
                    {
                        horizonalValue.map((value) =>
                            <input
                                defaultValue={value}
                                type="text"
                                key={'item' + iarray[i]} 
                                className='inputList'
                                id={iarray[i++]}
                                onChange={valueChange}
                            ></input>
                        )
                    }
                </div>
                <div>
                    <div>vertical radius</div>
                    {
                        verticalValue.map((value) =>
                            <input
                                defaultValue={value}
                                type="text"
                                 key={'item' + iarray[i]} //不去掉会--输入一个字符就回失去焦点 fixed!
                                className='inputList'
                                id={iarray[i++]}
                                onChange={valueChange}
                            ></input>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

function OutputArea(props) {
    const value = props.value
    const getOutput = props.getOutput;

    let borderStyle = `border-radius: ${value.tlRadiusFirst}${value.unit} ${value.trRadiusFirst}${value.unit} ${value.brRadiusFirst}${value.unit} ${value.blRadiusFirst}${value.unit} / ${value.tlRadiusSecond}${value.unit} ${value.trRadiusSecond}${value.unit} ${value.brRadiusSecond}${value.unit} ${value.blRadiusSecond}${value.unit};`;
    return (
        <div className='forOutput'>
            <div>
                {borderStyle}
            </div>
            <button onClick={getOutput}>
                Click to Copy
            </button>
        </div>
    );
}


const getBody = document.getElementsByTagName('body')[0];
ReactDOM.render(
    <BRadiusPreviewer />,
    getBody
);