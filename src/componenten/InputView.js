import * as React from "react";

class InputView extends React.Component {
    render() {
        return <div>
            Input
            <div className="ui black segment">{this.props.inputString}</div></div>
    }
}

export default InputView;