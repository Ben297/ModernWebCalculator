import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { evaluate } from 'mathjs'
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  text: '',
                        warningStatus: false,
                        lastOutput: ''
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyBoardInput)
    }

    handleKeyBoardInput = key =>{
        let allowedKeyArray = ["0","1","2","3","4","5","6","7","8","9"];
        let allowedOperatorArray = ['+','-','/','*','C','CE','.','(',')','=','Enter','Backspace'];
        if(allowedKeyArray.includes(key.key)){
            this.input = this.state.text+key.key;
            this.setState( {text : this.input});
        }else if(allowedOperatorArray.includes(key.key)){
            this.handleOperatorInputs(key.key);
        }else{
            console.log('other Char');
        }
    };

    handleTextInput = text => {
        this.setState({text})
    };

    handleNumInputs = value => {
        this.input = this.state.text+value;;
        //this.input = this.input.replace(/\b0+/g, '');
        this.setState( {text : this.input});

    };

    handleOperatorInputs = value =>{
        switch (value) {
            case 'C':
                this.resetCalculator();
                break;
            case '=':
            case 'Enter':
                this.evaluateTerm(this.state.text);
                break;
            case 'CE':
            case 'Backspace':
                this.setState( {text : this.state.text.substring(0,this.state.text.length - 1)});
                break;
            case '+':
            case '-':
            case '/':
            case '*':
            case '.':
            case '(':
            case ')':
                this.setState( {text : this.state.text + value});
                break;
        }
    };

    evaluateTerm(text) {
        let evaluationTerm =  text.replace(/\b0+/g, '');
        try {
            evaluationTerm  = evaluate(evaluationTerm);
            this.setState({warningStatus : false});
            this.setState({text : ''});
            this.setState({lastOutput : evaluationTerm})

        }catch (e) {
            console.log('This Expression is not valid');
            this.setState({warningStatus : true});
        }
    }

    resetCalculator (){
        this.setState({text : ''})
    }

    render() {
        const Operators = ['+','-','/','*','C','CE','.','(',')','='];
        return <div>
            <h1 className="ui blue center aligned header">Awesome Calculator</h1>
            <div className="ui raised very padded text container segment">
                <WarningBadge warningStatus = {this.state.warningStatus}/>
                <TextInput onInput={this.handleTextInput}/>
                <InputView text ={this.state.text}/>
                <div className="ui divider"/>
                <OutputView text={this.state.lastOutput}/>
                <div className="ui divider"/>
                <div className="ui equal width grid">
                    <div className="column">
                        <NumButtons onClick={this.handleNumInputs} min={0} max={9}/>
                    </div>
                    <div className="column"><ActionButtons onClick={this.handleOperatorInputs} symbols={Operators}/></div>

                    <div className="equal width row">
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                </div>


            </div>
        </div>
    }


}
class ActionButtons extends React.Component{
    handleClick = value => event => {
        const {onClick} = this.props;
        if(onClick){
            onClick(value)
        }
    };

    render() {
        const actionButtons = [];
        const {symbols} = this.props ;
        let test;
        for (let value of symbols) {
            actionButtons.push(<button className="ui button" onClick={this.handleClick(value)}>{value}</button>)
        }

        return <div className="teal ui buttons">{actionButtons}</div>;
    }

}

class WarningBadge extends React.Component{
    render() {
        if (this.props.warningStatus === true){
          return  <div className="ui negative message">

                <div className="header">
                   The Term you tried to evaluate is not valid
                </div>
                <p>Please try again!</p></div>
        }else
            return <div></div>
    }
}
class NumButtons extends React.Component{
    handleClick = value => event => {
        const {onClick} = this.props;
        if(onClick){
            onClick(value)
        }
    };

    render() {
        let buttons = [];
        const {min,max} = this.props;
        const divStyle = {
            padding: 2 +'px',

        };
        let counter=0;
        let allTheButtons  =  [] ;
        let buttonsthree = {};
        for (let i = max;i >= min ; --i) {
            console.log(<i></i>)
            if (counter === 3) {
                buttonsthree = <div className="row"><div style={divStyle} className="blue ui buttons">{buttons}</div></div>;
                    allTheButtons.push(buttonsthree);
                counter = 0;
                buttons = []
            }
            buttons.push(<button className="ui button" onClick={this.handleClick(i)}>{i}</button>);
            if(i===0){
                buttonsthree = <div style={divStyle} className="blue ui center aligned buttons">{buttons}</div>;
                allTheButtons.push(buttonsthree);
            }
            counter++;

        }


            return allTheButtons
    }
}

class InputView extends React.Component {
    render() {
        return <div>
            Input
            <div className="ui black segment">{this.props.text}</div></div>
    }
}

class OutputView extends React.Component {
    render() {
        return <div>
            Result
            <div className="ui green segment">{this.props.text}</div></div>
    }
}

class TextInput extends React.Component {
    handleInput = event => {
        const {onInput} = this.props;
        if (onInput) {
            onInput(event.target.value)
        }
    };

    render() {
        return  <div className="ui form">
                    <div className="field">
                        <input type="hidden" onInput={this.handleInput}/>
                    </div>
                </div>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
