import React from 'react';
import GridRow from './GridRow';
import $ from "jquery";

let indexCol = null;

class GridRows extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            selectedRowIds: [], lastSelectedRowId:"", pressedCtrlKey: false, isMouseButtonPressed: false,
            selectedRows: []
        })
    }

    componentDidMount(){
    }

    onMouseOver(data, rowId, event){
        let {selectedRows,selectedRowIds,isMouseButtonPressed} = this.state;
        if (isMouseButtonPressed) {
            event.preventDefault();
            if(selectedRows[rowId]){
                delete selectedRows[rowId];
            }
            selectedRows[rowId] = {
                rowId: rowId,
                data: data
            };
            let index = selectedRowIds.indexOf(rowId);
            if(index > -1){
                selectedRowIds.splice(index, 1);
            }
            selectedRowIds.push(rowId);
            $("#"+rowId).focus();
        }
    }

    onMouseDown(data, rowId, event){
        const {selectedRowIds, selectedRows, triggerMouseUp} = this.state;
        var _selectedRowIds = event.ctrlKey ? selectedRowIds : [];
        var _selectedRows = event.ctrlKey ? selectedRows : [];
        if (_selectedRows[rowId]) {
            delete _selectedRows[rowId];
            // toggle if ctrl key is pressed
            if(!event.ctrlKey) {
                _selectedRows[rowId] = {
                    rowId: rowId,
                    data: data
                };
            }
        }else{
            _selectedRows[rowId] = {
                rowId: rowId,
                data: data
            };
        }
        let index = _selectedRowIds.indexOf(rowId);
        if(index > -1){
            _selectedRowIds.splice(index, 1);
            // toggle if ctrl key is pressed
            if(!event.ctrlKey){
                _selectedRowIds.push(rowId);
            }
        }else
            _selectedRowIds.push(rowId);
        $("#"+rowId).focus();
        this.setState({
            selectedRows: _selectedRows, selectedRowIds: _selectedRowIds,isMouseButtonPressed: true
        }, () => {
            if(event.callMouseUp){
                this.onMouseUp(event);
            }
        })
    }

    onMouseUp(event){
        const {selectedRows, selectedRowIds} = this.state;
        this.setState({
            isMouseButtonPressed: false,
            lastSelectedRowId: selectedRowIds[selectedRowIds.length-1],
        }, () => {
            this.props.onRowClick(event, selectedRows)
        });
    }

    handleKeyPress(data, rowId, previousData, nextData, event){
        let _this = this;
        if(event.keyCode === 38)
            this.onUpArrowPress(event, previousData);
        else if(event.keyCode === 40)
            this.onDownArrowPress(event, nextData);
    }

    onUpArrowPress(event, data){
        let _this = this;
        var row = $("#"+this.state.lastSelectedRowId);
        let ancestor = row.prev();
        let ancestorId = ancestor.attr("id");
        if(ancestorId!==null && ancestorId!==undefined){
            ancestor.on('mousedown', function(){
                event.callMouseUp = true;
                _this.onMouseDown(data, ancestorId, event);
            });
            _this.state.lastSelectedRowId = ancestorId;
            ancestor.trigger('mousedown');
            ancestor.unbind('mousedown');
        }
    }

    onDownArrowPress(event, data){
        let _this = this;
        var row = $("#"+this.state.lastSelectedRowId);
        let successor = row.next();
        let successorId = successor.attr("id");
        if(successorId!==null && successorId!==undefined){
            successor.on('mousedown', function () {
                event.callMouseUp = true;
                _this.onMouseDown(data, successorId, event);
            });
            _this.state.lastSelectedRowId = successorId;
            successor.trigger("mousedown");
            successor.unbind('mousedown')
        }
    }

    render(){
        const {selectedRowIds, selectedRows,lastSelectedRowId} = this.state;
        var _indexCol = this.props.indexColumn;
        var rowclassName = this.props.row ? 'customRowContainer' : 'defaultRowContainer';
        rowclassName += this.props.showCheckbox ? ' showCheck' : '';
        let indexOffSet = this.props.indexOffset;
        var rows = this.props.data.map((item, index, data)=> {
            let rowId = item[_indexCol] ? item[_indexCol] : index + indexOffSet;
            let rowClass = "row-"+rowId;
            if(selectedRowIds.indexOf(rowId) > -1)
                rowClass += " table-success";
            return (
                <tr tabIndex={0} ref="table-row" key={index} className={rowClass} id={rowId}
                    onMouseDown={this.onMouseDown.bind(this, item, item[_indexCol])} onMouseUp={this.onMouseUp.bind(this)} onMouseOver={this.onMouseOver.bind(this, item, item[_indexCol])}
                    onKeyUp={this.handleKeyPress.bind(this, item, item[_indexCol], data[index-1], data[index+1])}
                    >
                    <GridRow {...this.props}
                             rowId={rowId}
                             data={item}
                             rowClass={rowClass}
                             keyIndex={index}
                             key={index} className={rowclassName + " "+ rowClass}
                    />
                </tr>
            );
        });

        return (
            <React.Fragment>{rows}</React.Fragment>
        );
    }
};



GridRows.defaultProps = {
    data: [],
    columnMetadata: [],
    onRowClick:()=>{},
    onChangeGrid:()=>{}
}

export default GridRows;
