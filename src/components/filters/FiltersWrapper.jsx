/**
 * Created by RNEUP on 3/1/2018.
 */
import React from 'react'
import Greater from './Greater';
import Smaller from './Smaller';

class FiltersWrapper extends React.Component{
    constructor(props){
        super(props);
        this.applyFilter = this.applyFilter.bind(this);
        this.onOkayClick = this.onOkayClick.bind(this);
        this.state = ({
            filterProps: this.props.filterProps
        })
    }

    applyFilter(type, event){
        let _filterProps = [];
        Object.assign(_filterProps,this.props.filterProps);
        let _filter = _filterProps[this.props.searchBoxMeta.currentColumnPosition];
        _filter.criteria[type] = event.target.value;
        if(event.target.value === "" || event.target.value === "undefined")
            delete _filter.criteria[type];
        this.setState({
            filterProps: _filterProps
        })
    }

    onOkayClick(){
        this.props.handleAdvanceFilter(this.state.filterProps);
        this.props.closeModal()
    }

    render(){
        return (
            <div>
                <table style={{borderCollapse:"separate", borderSpacing:"0 1em"}}>
                    <thead>
                        <tr><th>!!Not applicable if value is Not A Number.!!</th></tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="2"><h4>Filter Criteria for {this.props.searchBoxMeta.placeHolder}</h4></td></tr>
                        <Greater changeHandler={this.applyFilter.bind(this, "GreaterThan")}/>
                        <Smaller changeHandler={this.applyFilter.bind(this, "LessThan")}/>
                    </tbody>
                </table>
                <div>
                    <input type="button" value="Okay" onClick={this.onOkayClick}/>
                </div>
            </div>
        )
    }
}

export default FiltersWrapper;
