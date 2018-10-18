/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import CustomLink from "./Link";
import $ from 'jquery'


class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowLink: "", currentlySelectedRowId:"" }
    }

    handleOnClick(event) {
        this.commonOnClick(event);
        this.props.onRowClick(event,this.props.data);
        this.setState({
            currentlySelectedRowId: this.props.rowId
        })
    }

    handleOnDoubleClick(event){
        this.commonOnClick(event);
        this.props.onRowDoubleClick(event, this.props.data);
        this.setState({
            currentlySelectedRowId: this.props.rowId
        })
    }

    commonOnClick(event){
        event.target.focus();
        this.props.handleRowSelection(event);
        this.props.addClassToSelectedRow(this.props.rowId);
    }

    handleKeyPress(event){
        if(event.keyCode === 38)
            this.onUpArrowPress();
        else if(event.keyCode === 40)
            this.onDownArrowPress();

    }

    onUpArrowPress(){
        var row = $("#"+this.state.currentlySelectedRowId);
        let ancestor = row.prev();
        if(ancestor!==null && ancestor!==undefined)
            ancestor.find("td:first-child").click();
    }

    onDownArrowPress(){
        var row = $("#"+this.state.currentlySelectedRowId);
        let successor = row.next();
        if(successor!==null && successor!==undefined)
            successor.find("td:first-child").click();
    }

    render() {
        var columnKey = this.props.rowLink + "/" + this.props.data[this.props.columnMetadata.filter(function(c){ return c.indexCol === "true" }).map(function(c){return c.columnName})];
        var rowValColor = this.props.data[this.props.columnMetadata.filter(function(c){ return c.status === "true" }).map(function(c){return c.columnName})];
        var rowColorClass = this.props.colorConfig[rowValColor];
        var rowCells = (
            this.props.columnMetadata.sort(function(a,b) {return a.order - b.order}).map((columnMeta, columnIndex) => {
                var displayDiv = "";
                if (columnMeta.hidden === 'false') {
                    var style = (columnMeta.flexBasis !== undefined) ? {
                        flexBasis: columnMeta.flexBasis,
                        flexGrow: 0,
                        flexShrink: 0
                    } : {};
                    if (columnMeta.flexGrow !== undefined) {
                        style.flexGrow = columnMeta.flexGrow;
                    }
                    if (typeof columnMeta.render === "function") {
                        var cell = columnMeta.render(this.props, this.state, columnMeta, columnIndex);
                    }
                    else if (typeof columnMeta.render !== "undefined") {
                        var customCellFormatter = this.props.customCellFormatters[columnMeta.render];
                        cell = customCellFormatter(this.props, this.state, columnMeta, columnIndex, this.props.rowId, this.props.data[columnMeta.columnName]);
                    } else {
                        cell = this.props.data[columnMeta.columnName];
                        style.overflow = 'hidden'
                    }

                    if (typeof columnMeta.formatter === 'function') {
                        var cellToolTip = columnMeta.formatter(this.props.data[columnMeta.columnName]);
                    } else if (typeof this.props.data[columnMeta.columnName] === 'string') {
                        cellToolTip = this.props.data[columnMeta.columnName];
                    } else {
                        cellToolTip = columnMeta.displayName;
                    }
                    // style = Object.assign(style, columnMeta.style);
                    displayDiv = (<td tabIndex={columnIndex} key={columnIndex} onClick={this.handleOnClick.bind(this)} onDoubleClick={this.handleOnDoubleClick.bind(this)} ref="table-row"
                            onKeyUp={this.handleKeyPress.bind(this)} onKeyDown={this.props.setPressedCtrlKey} style={{overflow:'visible'}}>
                            <div id={"column-"+this.props.rowId+"-"+columnIndex}
                                className={rowColorClass + ' defaultCell .table-hover cell column-' + columnIndex + ' column-' + columnMeta.columnName + " " + columnMeta.className}
                                style={style} key={columnIndex} title={cellToolTip}>
                                {(this.props.rowLink && columnMeta.indexCol === "true") ?
                                    <CustomLink className={"anchor " + rowColorClass} link={columnKey}
                                                body={cell}
                                                target={this.props.target ? this.props.target : "_blank"}/> : cell}

                            </div>
                        </td>)
                }
                return (displayDiv);
            }));
        return (
            <React.Fragment>{rowCells}</React.Fragment>
        )
    }
}

Row.defaultProps = {
    data: {},
    columnMetadata: [],
    className: '',
    onRowClick: () => { },
    onRowDoubleClick: () => { },
    onRowSelection: () => { }
};

export default Row;
