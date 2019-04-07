import React from 'react';
import Table from './MainTable'
import DefaultConfig from '../config/DefaultConfig.json'
import _ from 'underscore';
import Header from '../header/Header';
import Row from './Row';
import Pagination from '../pagination/Pagination'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeGrid = this.onChangeGrid.bind(this);
        this.state = {
            tableConfig: {
                columnMetadata: props.config ? props.config : DefaultConfig,
                currentPage: 1,
                showCheckbox: props.showCheckBox ? props.showCheckBox : false,
                filterOptions: props.filterOptions ? props.filterOptions : false,
                settingOptions: props.settingOptions,
                refreshOptions: props.refreshOptions,
                appCode: props.appCode,
                showCheckAllCheckbox: props.showCheckAllCheckbox ? props.showCheckAllCheckbox : false,
                showAllData: props.showAllData ? props.showAllData : false,
                onChangeGrid: props.onChangeGrid ? props.onChangeGrid : this.onChangeGrid,
                selectedRows: {},
                onRowClick: props.onRowClick ? props.onRowClick: this.onRowClick,
                onRowDoubleClick: props.onRowDoubleClick ? props.onRowDoubleClick:this.onRowDoubleClick,
                resultsPerPage: props.resultsPerPage ? props.resultsPerPage : 10,
                row: Row,
                header: Header,
                pagination: Pagination,
                showHeader: props.showHeader ? props.showHeader : true,
                showPagination: props.showPagination ? props.showPagination : true,
                masterSearch: props.masterSearch ? props.masterSearch : true,
                heading:props.heading ? props.heading : "Grid",
                rowLink: props.rowLink ? props.rowLink : null,
                customCellFormatters: props.customCellFormatters ? props.customCellFormatters : null,
                colorConfig: props.colorConfig ? props.colorConfig : {},
                settingsLink: props.settingsLink ? props.settingsLink : null,
                indexOffset: 0,
                checkAll: false,
                totalCount: 0,
                indexColumn: props.indexColumn ? props.indexColumn : null,
                fixedHeight:props.fixedHeight,
                refreshData: props.refreshData
                // width: '1000px'
            }
        }
    }

    onChangeGrid(event, data) {
        let tableConfig = this.state.tableConfig;
        _.extend(tableConfig, data);
        this.setState({
            tableConfig: tableConfig
        });

        // if(this.props.showCheckBox){
        //     this.props.onCheckBoxChange(event,data);
        // }
    }

    render() {
        return <div>
            <Table data={this.props.data ? this.props.data : []} style={{ margin: '30px' }} {...this.state.tableConfig} />
        </div>
    }
}

export default Page;

