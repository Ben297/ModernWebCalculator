import * as React from "react";

class OutputView extends React.Component {
    render() {
        return <div>
            Result
            <div className="ui green segment">{this.props.output}</div></div>
    }
}
export default OutputView;