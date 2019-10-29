import * as React from "react";

class ActionButtons extends React.Component{
    handleClick = value => event => {
        const {onClick} = this.props;
        if(onClick){
            onClick(value)
        }
    };

    render() {
        let actionButtons = [];
        const {symbols} = this.props ;
        const divStyle = {
            padding: 2 + 'px',
        };
        let counter = 0;
        let allTheButtons = [];
        let buttonGroup = {};
        for (let value of symbols) {
            if (counter === 3) {
                buttonGroup = <div className="row">
                    <div style={divStyle} className="three  blue ui buttons">{actionButtons}</div>
                </div>;
                allTheButtons.push(buttonGroup);
                counter = 0;
                actionButtons = []
            }
            actionButtons.push(<button className="three ui button" onClick={this.handleClick(value)}>{value}</button>);
            if (value === '=') {
                buttonGroup = <div className="row">
                    <div style={divStyle} className="green inverted ui buttons">{actionButtons}</div>
                </div>;
                allTheButtons.push(buttonGroup);
            }
            counter++;

        }
        return allTheButtons;





    }




}

export default ActionButtons; //