import React from 'react';
import Modal from 'react-awesome-modal';
import FiltersWrapper from '../../filters/FiltersWrapper'

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
           openFilterModal: false
        });
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    openModal(type){
        this.setState({ [type]: true });
    };

    closeModal(type){
        this.setState({ [type]: false });
    };

    onChangeHandler(event){
        this.props.searchBoxHandler && this.props.searchBoxHandler(event);
    }

    onFilterClick(event){
        this.openModal("openFilterModal");
    }

    render() {
        if (this.props.searchBoxMeta.search === 'true') {
            return (
                <React.Fragment>
                    <Modal visible={this.state.openFilterModal} width="400" height="300" effect="fadeInUp" onClickAway={this.closeModal.bind(this,'openFilterModal')}>
                        <div className="center-contents-div filter-modal-container">
                            <FiltersWrapper {...this.props} closeModal={this.closeModal.bind(this, "openFilterModal")}/>
                        </div>
                    </Modal>
                    <input className="header-search" onChange={this.onChangeHandler} placeholder={"Search "+this.props.searchBoxMeta.placeHolder} type='text' name={this.props.searchBoxMeta.searchBoxName} id={this.props.id} />
                    <a className="header-filter-icon" href="javascript:void(0)" onClick={this.openModal.bind(this,"openFilterModal")}> <i className="fa fa-filter" onClick={this.openModal.bind(this,"openFilterModal")} style={{color: "white"}}/> </a>
                </React.Fragment>)
        }else return (<div  style={this.props.style}/>);
    }
}

SearchBox.defaultProps = {
    name : 'searchBox'
};

class Header extends React.Component  {
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.emptyObject = this.emptyObject.bind(this);
    }

    handleOnClick (event) {
        var sortColumn = event.currentTarget.getAttribute('data-column');
        var sortDirection = null;
        var sortColumns = this.props.sortColumns;
        if(sortColumn === this.props.sortColumn){
            if (this.props.sortDirection ==='ASC')
                sortDirection = 'DESC';
            else
                sortDirection = 'ASC';
            if(!event.ctrlKey)
                this.emptyObject(sortColumns);
            sortColumns[sortColumn] = sortDirection;
        }
        else{
            sortDirection = 'ASC';
            if(!event.ctrlKey)
                this.emptyObject(sortColumns);
            sortColumns[sortColumn] = sortDirection;
        }
        this.props.onChangeGrid(event,{
            sortColumns: sortColumns,
            sortColumn: sortColumn,
            sortDirection: sortDirection,
            columnDataType: event.currentTarget.getAttribute("data-type")
        });
    }

    emptyObject (objectToClean){
        for (var x in objectToClean) if (objectToClean.hasOwnProperty(x)) delete objectToClean[x];
    }

    render (){
        var HeaderCells = this.props.columnMetadata.sort(function(a,b) {return a.order - b.order}).map((columnMeta,columnIndex)=>{
            if(columnMeta.hidden === 'false'){
                var displayName = columnMeta.displayName;
                var sortIcon =  {"ASC":"▲", "DESC":"▼"};
                var sort = columnMeta.sort;
                var style = (columnMeta.flexBasis !== undefined) ? {flexBasis:columnMeta.flexBasis,flexGrow:0,flexShrink:1} : {};
                if (columnMeta.flexGrow !== undefined) {
                    style.flexGrow = columnMeta.flexGrow;
                }

                style = Object.assign(style,columnMeta.style,columnMeta.headerStyle);

                var searchBoxMeta = {
                    searchBoxName : columnMeta.columnName+"-search-box",
                    search: columnMeta.search,
                    placeHolder: columnMeta.displayName,
                    currentColumn: columnMeta.columnName,
                    currentColumnPosition: columnMeta.order-1
                };

                var displayDiv = "";

                displayDiv =
                    <th key={columnIndex} className="th-sm">
                    <div  className={'defaultCell column-'+columnIndex+' column-'+columnMeta.columnName+' header-cell'} style={style} key={columnIndex}>
                        <div className={'inner-header '+columnMeta.classNames} data-type={columnMeta.type} data-column = {columnMeta.columnName} title={columnMeta.toolTip||displayName} onClick = {sort==="true"?this.handleOnClick:null} key={columnIndex}>
                            {displayName}<span style={{ position:'relative'}}>{(Object.keys(this.props.sortColumns).indexOf(columnMeta.columnName) > -1) ? sortIcon[this.props.sortColumns[columnMeta.columnName]] : ""}</span><br/>
                        </div>
                        {<SearchBox {...this.props} searchBoxHandler={this.props.onSearchBoxChange}  searchBoxMeta={searchBoxMeta} />}
                    </div>
                    </th>
            }


            return (  displayDiv );


        });

        return (
            <React.Fragment>
                {HeaderCells}
            </React.Fragment>
        )
    }
}

export default Header;