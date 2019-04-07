const React = require('react');

class Link extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <a className={this.props.className} href={this.props.link} target={this.props.target}>{this.props.body}</a>
        )
    }
};

export default Link;