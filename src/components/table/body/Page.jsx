import React from 'react';
import SmartGrid from './MainTable'
import DefaultConfig from '../config/DefaultConfig.json'
const _ = require('underscore');

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeGrid = this.onChangeGrid.bind(this);
        this.state = ({
            tableConfig: {
                columnMetadata: props.config ? props.config : DefaultConfig,
                currentPage: 1,
                showAllData: props.showAllData ? props.showAllData : false,
                onChangeGrid: props.onChangeGrid ? props.onChangeGrid : this.onChangeGrid,
                selectedRows: {},
                onRowClick: props.onRowClick ? props.onRowClick : null,
                onRowDoubleClick: props.onRowDoubleClick ? props.onRowDoubleClick : null,
                onRowSelection: props.onRowSelection ? props.onRowSelection : null,
                resultsPerPage: props.resultsPerPage ? props.resultsPerPage : 10,
                showHeader: props.showHeader!==undefined && !props.showHeader ? props.showHeader : true,
                showPagination: props.showPagination!==undefined && !props.showPagination ? props.showPagination : true,
                masterSearch: props.masterSearch!==undefined && !props.masterSearch ? props.masterSearch : true,
                heading: props.heading ? props.heading : "Grid",
                rowLink: props.rowLink ? props.rowLink : null,
                customCellFormatters: props.customCellFormatters ? props.customCellFormatters : null,
                colorConfig: props.colorConfig ? props.colorConfig : {},
                settingsLink: props.settingsLink ? props.settingsLink : null,
                indexOffset: 0,
                totalCount: 0,
                indexColumn: props.indexColumn ? props.indexColumn : null,
                className: props.className ? props.className : "",
                // width: '1000px'
            }
        })
    }

    onChangeGrid(event, data) {
        let tableConfig = this.state.tableConfig;
        _.extend(tableConfig, data);
        this.setState({
            tableConfig: tableConfig
        });
        this.props.onRowSelection(event,data);
    }

    render() {
        return (
            <div>
                <SmartGrid data={this.props.data ? this.props.data : []} style={{ margin: '30px' }} {...this.state.tableConfig} />
            </div>
        )
    }
}

export default Page

