import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '',}}

    componentDidMount() {
        window.addEventListener("keypress", (e) => {
            console.log(e.code);
        });
    }

    handleTextInput = text => {
        this.setState({text})
    };

    handleNumInputs = value => {
        let input = this.state.text+value;
        this.setState( {text : input});
        console.log('I the app received', value)
    };

    handleOperatorInputs = value =>{
        console.log('I the app received', value);
        switch (value) {
            case 'CE':
                this.resetCalculator();
                break;
            case '=':
                this.evaluateTerm(this.state.text);
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
       // let removeZeros = text.replace(/^0+/, '');
        let evaluate = eval(text);
        this.setState({text : evaluate});
    }
    resetCalculator (){
        this.setState({text : null})
    }

    render() {
        const Operators = ['+','-','/','*','CE','.','(',')','='];
        return <div>
            <div className="ui raised very padded text container segment">
                <h2 className="ui header">Calculator</h2>
                <TextInput onInput={this.handleTextInput}/>
                <div className="ui divider"/>
                <TextView text={this.state.text}/>
                <div className="ui divider"/>
                <NumButtons onClick={this.handleNumInputs} min={0} max={9}/>
                <ActionButtons onClick={this.handleOperatorInputs} symbols={Operators}  />
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
        for (let value of symbols) {
            actionButtons.push(<button class="ui button" onClick={this.handleClick(value)}>{value}</button>)
        }
        return <div className="teal ui buttons">{actionButtons}</div>
    }

}
class NumButtons extends React.Component{
    // kind of a facorwty
    handleClick = value => event => {
        const {onClick} = this.props;
        if(onClick){
            onClick(value)
        }
    };

    render() {
        const buttons = [];
        const {min,max} = this.props;
        for (let i = min;i <= max ; ++i) {
            buttons.push(<button class="ui button" onClick={this.handleClick(i)}>{i}</button>)
        }
            return <div className="blue ui buttons">{buttons}</div>
    }


}
class TextView extends React.Component {
    render() {
        return <div>
            <div className="ui black segment">{this.props.text}</div></div>
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
                        <label>User Input</label>
                        <input onInput={this.handleInput}/>
                    </div>
                </div>



    }
}

class Operators extends React.Component{

    render() {
        return <div>
            <button class="ui compact teal button">+</button>
            <button class="ui compact teal button">-</button>
            <button class="ui compact teal button">/</button>
            <button class="ui compact teal button">*</button>
            <button class="ui compact teal button">(</button>
            <button class="ui compact teal button">)</button>
            <button class="ui compact teal button">=</button>
            <button class="ui compact teal button">=</button>

        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
