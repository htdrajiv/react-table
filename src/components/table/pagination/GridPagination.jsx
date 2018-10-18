import React from 'react';
import Pagination from './Pagination'

class GridPagination extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalPages : Math.ceil(this.props.numberOfEntries / this.props.resultsPerPage)
        };
        this.onChangeGrid = this.onChangeGrid.bind(this);
    }
    onChangeGrid(event, data) {
        var newData = data;
        // newData.selectedRows = {};
        this.props.onChangeGrid(event, newData);
    }
    
    render () {
        var optionsArray = [];
        for (var i = 1; i <= this.state.totalPages; i++) {
            optionsArray.push(
                <option >{i}</option>
            )
        }
        return (
            <div>
                {this.props.showPagination ? <Pagination {...this.props}
                                  onChangeGrid={this.onChangeGrid}
                                  /> : null}
            </div>
        )
    }
};

export default GridPagination;