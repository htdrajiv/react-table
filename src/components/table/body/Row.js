import React from 'react';
import CustomLink from "./Link";

class DefaultRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expand: false, rowLink: "" }
    }

    render() {
        var columnKey = this.props.rowLink + "/" + this.props.data[this.props.columnMetadata.filter(function(c){ return c.indexCol === "true" }).map(function(c){return c.columnName})];
        var rowValColor = this.props.data[this.props.columnMetadata.filter(function(c){ return c.status === "true" }).map(function(c){return c.columnName})];
        var rowColorClass = this.props.colorConfig[rowValColor];
        var expandIcon = (this.state.expand || this.props.expandAll)? <i className="fa fa-angle-up"/>:<i className="fa fa-angle-down"/> ;
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
                    displayDiv = (<td tabIndex={columnIndex} key={columnIndex} style={{overflow:'visible'}} >
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

DefaultRow.defaultProps = {
    data: {},
    columnMetadata: [],
    className: '',
    onExpand: () => { },
    onRowClick: () => { },
    onRowDoubleClick: () => { }
};

export default DefaultRow
