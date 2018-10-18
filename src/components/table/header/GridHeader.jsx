/* eslint-disable no-useless-concat */
import React from 'react';
import Header from './Header'

class GridHeader extends React.Component {
    constructor(props){
        super(props)
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleHeaderClick = this.handleHeaderClick.bind(this)
    }

      handleOnChange(event) {
        var selectedRows = this.props.selectedRows;
        if (!this.props.checkAll) {
            for (var i = 0; i < this.props.totalCount; i++) {
                var _data = this.props.data[i];
                selectedRows[_data[this.props.indexColumn]?_data[this.props.indexColumn]:i] = {
                    rowId: _data[this.props.indexColumn]?_data[this.props.indexColumn]:i,
                    data: _data
                };
            }
        }
        else {
            selectedRows = {};
        }
        this.props.onChangeGrid(event, {
            checkAll: !this.props.checkAll,
            selectedRows: selectedRows,
            render: false
        });
    }
    handleHeaderClick(data, event) {
        this.props.onHeaderClick && this.props.onHeaderClick(data, event);
    }

    render() {
        var headerContainerClass;
        headerContainerClass = 'customHeaderContainer';
        var headerContainer = (<Header {...this.props} onHeaderClick = {this.handleHeaderClick} onSearchBoxChange={this.props.onSearchBoxChange} />);
        var header = this.props.showHeader ? headerContainer : null;
        return (
            <tr className={'headerContainer ' + ' ' + headerContainerClass}>
                {header}
            </tr>
        )
    }
}

GridHeader.defaultProps = {
    columnMetadata: [],
    onHeaderClick:()=>{}
};

export default  GridHeader;