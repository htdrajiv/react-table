import React, { Component } from 'react';
import Table from './components/table/body/Page'

const DefaultData = require('./components/table/data/DefaultData');
const DefaultConfig = require('./components/table/config/DefaultConfig');

class App extends Component {
    onRowClick(event, data){
        /*
        * implement here
        * */
    }

    onRowDoubleClick(event, data){
        /*
        * implement here
        * */
    }

    onRowSelection(event, data){
        /*
        * implement here
        * */
    }

    render() {
        return (
            <div>
                <Table
                    data={DefaultData.data}
                    config={DefaultConfig} // default = defaultconfig
                    showAllData={false} // default false
                    onRowClick={this.onRowClick}
                    onRowDoubleClick={this.onRowDoubleClick}
                    onRowSelection={this.onRowSelection}
                    resultsPerPage={50} // default 10
                    // showHeader={false}
                    // showPagination={false}
                    // masterSearch={false}
                    heading={"My React Table"}
                    //  customCellFormatters={customCellFormatters}
                    //  colorConfig={colorConfig}
                    //  settingsLink={"/smad-web/settings/" + appCode}
                    className={" table-sm table-hover table-bordered table-striped "}
                />
            </div>
        );
    }
}

export default App;
