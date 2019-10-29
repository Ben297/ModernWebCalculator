import * as React from "react";

class NumButtons extends React.Component {
    handleClick = value => event => {
        const {onClick} = this.props;
        if (onClick) {
            onClick(value)
        }
    };

    render() {
        let buttons = [];
        const {min, max} = this.props;
        const divStyle = {
            padding: 2 + 'px',
        };
        let counter = 0;
        let allTheButtons = [];
        let buttonGroup = {};
        for (let i = max; i >= min; --i) {
            if (counter === 3) {
                buttonGroup = <div className="row">
                    <div style={divStyle} className=" three grey ui buttons">{buttons}</div>
                </div>;
                allTheButtons.push(buttonGroup);
                counter = 0;
                buttons = []
            }
            buttons.push(<button className="ui button" onClick={this.handleClick(i)}>{i}</button>);
            if (i === 0) {
                buttonGroup = <div className="row">
                    <div style={divStyle} className="grey ui buttons">{buttons}</div>
                </div>;
                allTheButtons.push(buttonGroup);
            }
            counter++;
        }
        return allTheButtons
    }
}

export default NumButtons ;