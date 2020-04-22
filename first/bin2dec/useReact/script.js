/* 
components structure should be:
bToDForm
        --OutputBox
 */


class BToDForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.state = { inputValue: '' };
    }

    handleChange(e) {
        /* there should be logical judge! */
        let tmp = e.target.value;

        // judge the lastest input number to be 0 or 1 And to avoid empty string
        if (tmp[tmp.length - 1] != '0' && tmp[tmp.length - 1] != '1' && tmp!=='') {
            tmp = tmp.slice(0, tmp.length - 1);
            alert('you should only input 0 or 1 !');
        }
        // let input less than 8 character
        else if (tmp.length > 8) {
            alert('you should input less than 8 digits!');
            tmp = tmp.slice(0, 8);
        }

        this.setState({ inputValue: tmp });
    }

    clearInput(e) {
        this.setState({
            inputValue: '',
        });
        e.preventDefault();

    }

    render() {
        const value = this.state.inputValue;
        return (
            <form name="BtoD" action="" autoComplete="off">
                <fieldset>
                    <legend>
                        A Bin2Dec Calculator
                </legend>
                    <label >Please input a binary number(at most 8 digits)</label>
                    <div>
                        <input value={value}
                            onChange={this.handleChange}
                        />
                        <button onClick={this.clearInput}>Clear Input</button>
                    </div>
                    <label>The decimal equivalent should be:</label>
                    <OutputBox value={value} />
                </fieldset>
            </form>
        );
    }
}

function OutputBox(props) {
    let tmp = 0;
    let sum = 0;
    // calculate to equivalent dec number
    for (let char of props.value) {
        tmp++;
        if (char != '0') {
            sum += Math.pow(2, props.value.length - tmp);
        }
    }
    // when input empty, show empty string
    if (!props.value) {
        return (
            <output>{''}</output>
        );
    }
    return (
        <output>{sum}</output>
    );
}

const getBody = document.getElementsByTagName('body')[0];
ReactDOM.render(
    <BToDForm />,
    getBody
);

