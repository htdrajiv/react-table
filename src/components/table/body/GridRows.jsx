import React from 'react';
import GridRow from './GridRow.jsx';


class GridRows extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            selectedRowIds: []
        })
    }

    addClassToSelectedRow(rowId, ctrlPressed){
        let selectedRowIds = this.state.selectedRowIds;
        if(ctrlPressed) {
            if(selectedRowIds.indexOf(rowId) > -1){
                let index = selectedRowIds.indexOf(rowId);
                if (index > -1) {
                    selectedRowIds.splice(index, 1);
                }
            }
            else
                selectedRowIds.push(rowId)
        }else{
            selectedRowIds = [rowId];
        }


        this.setState({
            selectedRowIds: selectedRowIds
        })
    }

    render(){
        var _indexCol = this.props.indexColumn;
        var rowclassName = this.props.row ? 'customRowContainer' : 'defaultRowContainer';
        let indexOffSet = this.props.indexOffset;
        let _this = this;
        var rows = this.props.data.map((item, index)=> {
            let rowId = "row-"+(item[_indexCol] ? item[_indexCol] : index + indexOffSet);
            let rowClass = "row-"+rowId;
            if(_this.state.selectedRowIds.indexOf(rowId) > -1)
                rowClass += " table-success";
            return (
                <tr key={index} className={rowClass} id={rowId} >
                    <GridRow {...this.props}
                             ctrlKeyPressed={this.state.pressedCtrlKey}
                             rowId={rowId}
                             data={item}
                             rowClass={rowClass}
                             keyIndex={index}
                             key={index} className={rowclassName + " "+ rowClass}
                             addClassToSelectedRow={this.addClassToSelectedRow.bind(this)}
                    />
                </tr>
            );
        });

        return (
            <React.Fragment>{rows}</React.Fragment>
        );
    }
};

export default GridRows;
