/* eslint-disable no-eval */
let symbols = {"LessThan":"<", "GreaterThan":">"};

function getSymbols(type){
    return symbols[type];
}

function advanceSearch (obj, filter) {
    let keys = Object.keys(filter.criteria);
    try {
        let value = obj[filter.columnName];
        let query = "1";
        if(keys.length > 0) {
            for (let k in keys) {
                query += " && ("+ value +" "+ getSymbols(keys[k]) + " "+ filter.criteria[keys[k]] + ") "
            }
        }
        return eval(query);
    } catch (e) {
        return false
    }
}

export function filterData(data, filters){
    return data.filter( (obj) => {
        return filters.every( (filter) => {
            return advanceSearch(obj, filter);
        })
    })
}

