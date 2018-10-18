import React from 'react';

class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangePage = this.handleOnChangePage.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.computeFrom = this.computeFrom.bind(this);
        this.computePage = this.computePage.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.state = {
            totalPages: this.computePage(this.props.totalCount, this.props.resultsPerPage),
            currentPage: this.props.currentPage
        }
    }
    handleOnChange(event) {
        var resultsPerPage = parseInt(event.target.value);
        this.props.onChangeGrid(null, {
            resultsPerPage: resultsPerPage,
            currentPage:1,
            selectedRows: this.props.selectedRows
        });
    }
    handleOnChangePage(event) {
        var currentPage = parseInt(event.target.value);
        this.props.onChangeGrid(null, {
            currentPage: currentPage,
            selectedRows: this.props.selectedRows
        });

    }
    handleNextClick(event) {
        if (this.state.currentPage < this.state.totalPages) {
            this.props.onChangeGrid(event, {
                currentPage: this.state.currentPage + 1,
                selectedRows: this.props.selectedRows
            });
        }
    }
    handlePreviousClick(event) {
        if (this.state.currentPage > 1) {
            this.props.onChangeGrid(event, {
                currentPage: this.state.currentPage - 1,
                selectedRows: this.props.selectedRows
            });
        }
    }

    handleLastClick(event){
        this.props.onChangeGrid(event, {
            currentPage: this.state.totalPages,
            selectedRows: this.props.selectedRows
        });
    }

    handleFirstClick(event){
        this.props.onChangeGrid(event, {
            currentPage: 1,
            selectedRows: this.props.selectedRows
        });
    }

    componentWillReceiveProps(nextProps) {
        var totalPages = this.computePage(nextProps.totalCount, nextProps.resultsPerPage);
        this.setState({
            totalPages: totalPages,
            currentPage: totalPages < nextProps.currentPage ? 1 : nextProps.currentPage
        });
    }

    computePage(totalCount, resultsPerPage){
        var totalPages = Math.floor(totalCount / resultsPerPage);
        if (totalCount % resultsPerPage !== 0) {
            totalPages++;
        }
        return totalPages;
    }

    computeFrom(currentPage, resultsPerPage){
        return ((currentPage - 1) * resultsPerPage);
    }

    render() {
        var optionsArray = [];
        var arr = [10,20,50,100,500,1000];
        for (let i = 0; i < arr.length; i++) {
            optionsArray.push(<option value={arr[i]} key={arr[i]} >{arr[i]}</option>);
        }
        var pageArr=[];
        for(let i=1;i<=Math.ceil(this.props.totalCount/this.props.resultsPerPage);i++){
            pageArr.push(<option value={i} key={i} >{i}</option>);
        }
        var from = this.computeFrom(this.props.currentPage,this.props.resultsPerPage);
        if(+from > +this.props.totalCount) from = 0;
        var to = from + this.props.resultsOnPage;

        return (
            <div className='customFooter'>
                <div className="pagination pull-left">
                    Rows per page : <select defaultValue={this.props.resultsPerPage?this.props.resultsPerPage:10} onChange={this.handleOnChange}>{optionsArray}</select> </div>
                <div className="pagination pull-right">
                    <div style={{display:'inline-block'}}>
                        {this.props.totalCount>0 && this.props.resultsOnPage>0 ? from + 1 :0}&nbsp;
                        to {to} &nbsp;
                        of {this.props.totalCount} rows &nbsp;&nbsp;&nbsp;</div>
                    <div style={{display:'inline-block'}}>
                        <button className="firstButton" type="button" onClick={this.handleFirstClick}>{"First"}</button>
                        &nbsp;
                        <button className='previousButton' type="button" onClick={this.handlePreviousClick}>
                            {"<"}
                        </button>
                        <select onChange={this.handleOnChangePage} value={this.props.currentPage}> {pageArr} </select>
                        <button className='nextButton' type="button" onClick={this.handleNextClick}>
                            {">"}
                        </button>
                        &nbsp;
                        <button className="lastButton" type="button" onClick={this.handleLastClick}>{"Last"}</button>
                        &nbsp;
                        <span> Total Pages: {this.state.totalPages} </span>
                    </div>
                </div>
                <div style={{clear:'both'}}/>
            </div>
        )
    }
};

export default Pagination;