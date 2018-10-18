##Dependencies:
- lodash.orderby
- react-search-input
- react-awesome-modal
- underscore
- column-resizer
- jquery


##Properties:
- config (Json Array): file describing the table structure including header and configuration for each cell. 
```json
[
    {
    "columnName": "id", // must match with key from data json.
    "displayName": "Id", // name of column that we want to show in table.
    "search": "true", // config to enable or disable searching for this column. 
    "sort": "true", // config to enable or disable sorting for this column. hold ctrl key to sort by multiple fields.
    "classNames": "clickable", // normal class name that can define different css 
    "hidden": "false", // config to hide or show this column.
    "type": "integer", // config to define type of values for this column. Sorting will be done based on this.
    "indexCol": "true", // config to point this column as an index column.
    "status":"true", // config that will work together with color config in properties.
    "order":1 // config for defining the order of columns. 
    }
]
```

- data (Json Array): data to be displayed in the grid in simple json format. column name from config must match with key for each column from data.
```json
[
    {
      "id": 10 // object key (**id** in this example) must match with **columnName** in config.
    }
]
```
- className (comma separated String) : class names that we want to have for table. eg. table-striped will created table with striped row.
- rowLink (string) : link for each row. It will append the value of index column indicated as indexCol in config json.
eg: if provided value for rowLink props is "myApp/myPage" then final link on the row will be "<baseurl>/myApp/myPage/<indexCol>" and this url must be defined in the route to
take care of what should be displayed.
- customCellFormatters (function) : if needed to display custom contents other than simple text values, like dropdowns, then pass the object containing the mapping of functions as
 value of render property in config json.  
 
    `eg.`
    `let customCellFormatters = {
            "customValue" : this.makeTextBold.bind(this);
        };`
                  
        `makeTextBold is a function that will make any text bold.`
        `customValue must present in config json as render property.`
        
- showAllData (boolean) : if needed to show all data at once in single page without pagination, pass this props as true;
- colorConfig (json object) : "status":"true" should put into config file for the coloumn on which we need to make color dependent and pass color config as:
    
    `let colorConfig = {
            "success":"bg-green text-white",
            "failure":"bg-red text-white"
        };`

- resultsPerPage (number) : for default number of rows per page. If not supplied, default is 10.
- showPagination (boolean) : option to hide or show pagination if not needed. default is true.
- showHeader (boolean) : option to hide or show table headers. default is true.
- masterSearch (boolean) : option to hide or show master search box. default is true.
- heading (String) : heading for table.
- settingsLink (String) : link to settings page which can configure the table.
 

##Events
- OnRowDoubleClick (function): function that will handle the row double click.

`@param event: event object generated from double clicking on row. contains information about target element.`

`@param data: data in json format from currently double clicked row.` 
- OnRowClick (function): function that will handle the row click

`@param event: event object generated from clicking on row. contains information about target element.`

`@param data: data in json format from currently clicked row.`
- onRowSelection (function): function that will handle row selection (holding the ctrl button, we can select more than one row.)

`@param event: event object generated from clicking (or say selecting) on row. contains information about target element.`

`@param data: data in json array which contains all selected rows data.`

