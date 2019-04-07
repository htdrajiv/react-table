import React from 'react';

class GridRow extends React.Component {
    constructor(props){
        super(props);
        this.state = ({

        })
    }

    render() {
        var checked = !!this.props.selectedRows[this.props.rowId];
        var Row = this.props.row;
        return (
            <React.Fragment>
                <Row {...this.props}
                     className=''
                     style={{}}
                     checked={checked}
                />
            </React.Fragment>
        );
    }
};

export default GridRow;
