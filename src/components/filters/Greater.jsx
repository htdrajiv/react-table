import React from 'react'

class Greater extends React.Component{


    render(){
        return (
            <tr>
                <td>Greater Than:</td><td> <input type="text" className="" onChange={this.props.changeHandler}/> </td>
            </tr>
        )
    }
}

export default Greater;