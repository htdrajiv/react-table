import React from 'react';
import orderby from 'lodash.orderby';

// import LoaderSpin from '../../common/Loader';
import GridHeader from '../header/GridHeader';
import GridPagination from '../pagination/GridPagination';
import GridRows from './GridRows.js';
import _  from "underscore";
import SearchInput, {createFilter} from 'react-search-input'
import ColumnResizer from 'column-resizer';
import Tools from '../tools/tools';

const filterCommon = require('../../filters/FilterCommon');

class SmartGrid extends React.Component {
    constructor(props) {
        super(props);
        /*
         * @search for setting text value from master search box.
         * @searchSource for holding all columns name for master search
         * @searchColumns for holding key:value pair for local search box as key = search box name and value = text value of that box
         * @totalRow for holding total rows count
         * */

        this.state = { search: '', searchSource:[], searchColumns:{}, totalRow:'', refresh: true, filterProps: [], reactGridTable:{} };
        this.initSearchConfig = this.initSearchConfig.bind(this);
        this.onChangeGrid = this.onChangeGrid.bind(this);
        this.sortDataOnColumn = this.sortDataOnColumn.bind(this);
        this.getResponseData = this.getResponseData.bind(this);
        this.masterPatternMatch = this.masterPatternMatch.bind(this);
        this.localPatternMatch = this.localPatternMatch.bind(this);
        this.localSearchHandler = this.localSearchHandler.bind(this);
        this.masterSearchHandler = this.masterSearchHandler.bind(this);
        this.sortData = this.sortData.bind(this);
        this.refresh = this.refresh.bind(this);
        this.findIndexColumn = this.findIndexColumn.bind(this);
        this.handleAdvanceFilterOptions = this.handleAdvanceFilterOptions.bind(this);
        this.applyAdvanceFilter = this.applyAdvanceFilter.bind(this);

        this.initSearchConfig();
    }

    componentDidMount(){
        this.state.reactGridTable = document.querySelector("#react-grid-table");
        this.initializeResize();
        document.getElementById("react-grid-table-body").addEventListener("keydown", function(e) {
            // space and arrow keys
            if([38, 40, 32].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
    }

    componentDidUpdate(prevProps){
        this.initializeResize();
    }

    initializeResize(){
        new ColumnResizer(this.state.reactGridTable,{
            liveDrag:true,
            draggingClass:"rangeDrag",
            gripInnerHtml:"<div class='rangeGrip' ></div>",
            resizeMode:'overflow',
            // width:'10em'
        });
    }

    initSearchConfig(){
        this.state.filterProps = [];
        this.props.columnMetadata.forEach(it => {
            this.state.searchSource.push(it.columnName);
            this.state.searchColumns[it.columnName] = "";
            this.state.filterProps.push({"columnName":it.columnName, "criteria":{}}) // criteria:  {"searchTerm":"", "filterType":""}
        });
    }

    onChangeGrid(event, data) {
        data = data || {};
        this.props.onChangeGrid && this.props.onChangeGrid(event, data, this.props.elementId);
    }

    sortDataOnColumn(data) {
        if (this.props.sortColumn === '')
            return data;
        data.map((item, index) => {
            item['_index'] = index;
        });
        data = this.sortData(data);
        return data;
    }

    sortData(data){
        let sortColumns = this.props.sortColumns;
        let _sortColumns = [];
        let _sortOrders = [];
        for(let column in sortColumns){
            _sortColumns.push(column);
            _sortOrders.push(sortColumns[column].toLowerCase())
        }
        return orderby(data, _sortColumns, _sortOrders)
    }

    getResponseData() {
        var data = this.sortDataOnColumn(this.props.data);
        if(this.props.masterSearch) {
            data = this.masterPatternMatch(data);
        }
        data = this.localPatternMatch(data);
        data = this.applyAdvanceFilter(data);

        var totalRow = data.length;
        var startIndex = !this.props.showAllData ? ((this.props.currentPage - 1) * this.props.resultsPerPage) : 0;
        if(startIndex > totalRow) startIndex = 0;
        var endIndex = !this.props.showAllData ? (startIndex + this.props.resultsPerPage) : totalRow;
        // for check all checkbox
        let allData = data;
        data = data.slice(startIndex, endIndex);
        return {data:data, totalRow: totalRow, allData: allData};
    }

    refresh(){
        this.refs['main-form'].reset();
        this.initSearchConfig();
        this.setState({
            search:'',
            refresh: true
        });
    }

    /*
     * for master search only started
     * */
    masterSearchHandler(event) {
        this.setState({
            search: event.target.value,
        });
    }

    masterPatternMatch(data) {
        var text = this.state.search;
        if (!text) { return data }
        data = data.filter(createFilter(this.state.search,this.state.searchSource));
        return data;
    }
    /*
     * for master search only ended
     * */


    /*
     * local search handler for each column started
     * */
    localSearchHandler(event){
        var temp = this.state.searchColumns;
        var name = event.target.name.split("-")[0];
        for(var key in temp){
            if(key===name)
                temp[key] = event.target.value
        }
        this.setState({
            searchColumns: temp
        })
    }

    localPatternMatch(data){
        var temp = this.state.searchColumns;
        for(var i in temp){
            data = data.filter(createFilter(temp[i],[i]));
        }
        return data;
    }

    /*
     * local search handler for each column ended
     * */

    handleAdvanceFilterOptions(filterProps){
        this.setState({
            filterProps: filterProps
        })
    }

    applyAdvanceFilter(data){
        return filterCommon.filterData(data, this.state.filterProps);
    }

    computeFrom(currentPage, resultsPerPage){
        return ((currentPage - 1) * resultsPerPage);
    }

    findIndexColumn(){
        var indexCol = null;
        this.props.columnMetadata.some((columnMeta, index) => {
            if(columnMeta.indexCol==="true"){
                indexCol = columnMeta.columnName
            }
        });
        return indexCol;
    }

    render() {
        let _obj = this.getResponseData();
        let data = this.props.data ? _obj.data : null;
        let allData = this.props.data ? _obj.allData : null;
        let totalRows = _obj.totalRow;
        if((totalRows < this.props.resultsPerPage && this.props.currentPage>1)){
            this.props.onChangeGrid(null, {
                currentPage:1
            });
        }

        var resultsOnPage = data && data.length <= this.props.resultsPerPage ? data.length : this.props.resultsPerPage;
        let indexOffSet = this.computeFrom(this.props.currentPage,this.props.resultsPerPage);
        let indexColumn = this.findIndexColumn();
        var fixedHeight = this.props.fixedHeight;
        return (
            <div className={'gridParent'} style={this.props.style}>
                <form ref={"main-form"}>
                <div className="">
                    <h3> {this.props.heading} </h3>
                </div>
                <div className="icons "  style={{margin:"0 0 1vh 0"}}>
                    <span style={{margin:"0 1vh 0 0"}}><button type="button" className={"btn btn-raised btn-xs"} onClick={this.refresh} >Reset All Filters</button></span>
                    { <Tools {...this.props}/>}
                </div>
                {this.props.masterSearch ? <div style={{clear:"both"}}> <input type="SmartInput" placeholder="Search Grid" className="grid-search" onChange={this.masterSearchHandler}/> </div> : null}
                {!this.props.showAllData ? (<GridPagination {...this.props}
                                                           className=''
                                                           style={{}}
                                                           currentPage={this.props.currentPage}
                                                           totalCount={totalRows}
                                                           onChangeGrid={this.onChangeGrid}
                                                           onRefresh={this.getResponseData}
                                                           resultsOnPage={resultsOnPage}/>) : "Total Rows : "+totalRows}
                <div className="table-responsive-sm smartGridScroll" style={{height: fixedHeight}}>
                    <table id={"react-grid-table"} className={"table table-sm .table-hover .table-bordered table-striped excel-style"}
                            >
                        <thead>
                        <GridHeader {...this.props}
                                    indexOffset = {indexOffSet}
                                    onSearchBoxChange={this.localSearchHandler}
                                    className=''
                                    style={{}}
                                    totalCount={totalRows}
                                    onChangeGrid={this.onChangeGrid}
                                    resultsOnPage={resultsOnPage}
                                    data={allData}
                                    indexColumn={indexColumn}
                                    filterProps={this.state.filterProps}
                                    handleAdvanceFilter={this.handleAdvanceFilterOptions}
                        />
                        </thead>
                        <tbody id={'react-grid-table-body'} className={'gridRowsContainer'}
                               style={Number.isInteger = Number.isInteger || function() {
                                   return typeof fixedHeight === 'number' &&
                                       isFinite(fixedHeight) &&
                                       Math.floor(fixedHeight) === fixedHeight;
                               } ? {
                                   overflowY: 'scroll',
                                   // display: 'block',
                                   // width:'100',
                                   height: fixedHeight
                               } : {}}
                        >
                        <GridRows {...this.props}
                                  indexOffset = {indexOffSet}
                                  className=''
                                  style={{}}
                                  onChangeGrid={this.onChangeGrid}
                                  resultsOnPage={resultsOnPage}
                                  data={data}
                                  indexColumn={indexColumn}
                        />
                        </tbody>
                    </table>
                </div>
                </form>
            </div>
        );

    }
}

SmartGrid.defaultProps = {
    className: '',
    data: null,
    showAllData: false,
    filterOptions: false,
    settingOptions: false,
    appCode:"",
    refreshOptions:false,
    resultsPerPage: 10,
    currentPage: 1,
    sortColumn: '',
    sortColumns:{},
    sortDirection: '',
    forceRender: false,
    loading: false,
    layout: 'row',
    actionList: [],
    onActionClick: () => {
    },
    showCheckbox: false,
    showCheckAllCheckbox: false,
    onHeaderClick: null,
    showHeader: true,
    showPagination: true,
    selectedRows: {},
    elementId: null,
    colorConfig: {},
    settingsLink: null,
    transform: function (response, elementId) {
        return response.body.data;
    }
};

export default SmartGrid;
