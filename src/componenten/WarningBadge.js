import * as React from "react";

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
export default WarningBadge;