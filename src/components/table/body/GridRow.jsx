import React from 'react';
import Row from './Row'

class GridRow extends React.Component {
    constructor(props){
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = ({
            pressedCtrlKey: false
        })
    }

    componentDidMount(){
        let _this = this;
        document.getElementById("react-grid-table-body").addEventListener('keyup', function(event){
            _this.state.pressedCtrlKey = event.ctrlKey
        });
        document.getElementById("react-grid-table-body").addEventListener('keydown', function(event){
            _this.state.pressedCtrlKey = event.ctrlKey
        })
    }

    handleOnChange(event) {
        this.props.onChangeGrid(event, {
            selectedRows: this.getSelectedRows()
        })
    }

    addClassToSelectedRow(rowId){
        this.props.addClassToSelectedRow(rowId, this.state.pressedCtrlKey);
    }

    getSelectedRows(){
        var selectedRows = this.state.pressedCtrlKey?this.props.selectedRows:[];
        if (selectedRows[this.props.rowId]) {
            delete selectedRows[this.props.rowId];
        }
        else {
            selectedRows[this.props.rowId] = {
                rowId: this.props.rowId,
                data: this.props.data
            };
        }
        return selectedRows;
    }

    render() {
        var checked = !!this.props.selectedRows[this.props.rowId];
        return (
            <React.Fragment>
                <Row {...this.props}
                     className=''
                     style={{}}
                     checked={checked}
                     handleRowSelection={this.handleOnChange}
                     pressedCtrlKey={this.state.pressedCtrlKey}
                     addClassToSelectedRow={this.addClassToSelectedRow.bind(this)}
                />
            </React.Fragment>
        );
    }
};

export default GridRow;
