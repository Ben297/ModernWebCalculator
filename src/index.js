import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { evaluate } from 'mathjs'
import * as serviceWorker from './serviceWorker';
import ActionButtons from './componenten/ActionButtons'
import NumButtons from './componenten/NumButtons'
import WarningBadge from './componenten/WarningBadge'
import InputView from './componenten/InputView'
import OutputView from './componenten/OutputView'
import TextInput from './componenten/TextInput'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  inputString: '',
                        warningStatus: false,
                        lastOutput: ''
        }
    }

    componentDidMount(){
        window.addEventListener("keydown", this.handleKeyBoardInput)
    }

    handleKeyBoardInput = key =>{
        let allowedKeyArray = ["0","1","2","3","4","5","6","7","8","9"];
        let allowedOperatorArray = ['+','-','/','*','C','CE','.','(',')','=','Enter','Backspace'];
        if(allowedKeyArray.includes(key.key)){
            this.setState( {inputString : this.state.inputString+key.key});
        }else if(allowedOperatorArray.includes(key.key)){
            this.handleOperatorInputs(key.key);
        }else{
            console.log('other Char');
        }
    };

    handleTextInput = inputString => {
        this.setState({text: inputString})
    };

    handleNumInputs = value => {
        this.setState( {inputString : this.state.inputString+value});
    };

    handleOperatorInputs = value =>{
        switch (value) {
            case 'C':
                this.resetCalculator();
                break;
            case '=':
            case 'Enter':
                this.evaluateTerm(this.state.inputString);
                break;
            case 'CE':
            case 'Backspace':
                this.setState( {inputString : this.state.inputString.substring(0,this.state.inputString.length - 1)});
                break;
            case '+':
            case '-':
            case '/':
            case '*':
            case '.':
            case '(':
            case ')':
                this.setState( {inputString : this.state.inputString + value});
                break;
        }
    };

    evaluateTerm(input) {
        try {
            let evaluationTerm  = evaluate(input);
            this.setState({warningStatus : false});
            this.setState({inputString : ''});
            this.setState({lastOutput : evaluationTerm})
        }catch (e) {
            console.log('This Expression is not valid');
            this.setState({warningStatus : true});
        }
    }

    resetCalculator (){
        this.setState({inputString : '',
                            lastOutput : '',
                            warningStatus : false})
    }

    render() {
        const Operators = ['+','-','/','(','*',')','C','CE','.','='];
        return <div>
            <h1 className="ui blue center aligned header">Awesome(?) Calculator</h1>
            <div className="ui raised very padded text container segment">
                <WarningBadge warningStatus = {this.state.warningStatus}/>
                <TextInput onInput={this.handleTextInput}/>
                <InputView inputString ={this.state.inputString}/>
                <div className="ui hidden divider"/>
                <OutputView output={this.state.lastOutput}/>
                <div className="ui hidden divider"/>
                <div className="ui center aligned equal width grid">
                    <div className="column">
                        <NumButtons onClick={this.handleNumInputs} min={0} max={9}/>
                    </div>
                    <div className="column">
                        <ActionButtons onClick={this.handleOperatorInputs} symbols={Operators}/>
                    </div>
                </div>
            </div>
        </div>
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
