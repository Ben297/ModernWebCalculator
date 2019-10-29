import * as React from "react";

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

export default TextInput;