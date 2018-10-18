import React from 'react'

class Smaller extends React.Component{


    render(){
        return(
            <tr>
                <td>Less Than:</td><td> <input type="text" className="" onChange={this.props.changeHandler}/> </td>
            </tr>
        )

    }
}

export default Smaller;