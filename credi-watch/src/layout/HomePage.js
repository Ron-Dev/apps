import React, { Component } from 'react';
import { connect } from "react-redux";
import searchedListAction from "../redux/actions/SearchedList";
import { bindActionCreators } from 'redux'
 import TopBar from '../core/TopBar';
 import staticData from  '../staticdata/StaticData';
 import History from  '../utils/History';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
 
  }
  componentWillMount(){
    this.props.searchedListAction(staticData.getData());
  }
  componentDidMount(){
  }
  componentWillUnmount(){
  }
  getRow=(object,keyUnique)=>{ 
    var cells=[];
    Object.keys(object).forEach((key,index)=> {
      let value = object[key];
        cells.push(getCell(value,keyUnique+"_cell_"+index));
    });
    return <div key={keyUnique+"row"}
              className="row">{cells}</div>;
  }
  render() {
    var searchedList=this.props.searchedList&&this.props.searchedList.data?this.props.searchedList.data:{};
    var tableHeader=[];
		var tableRows=[];
		var keyUnique=0;
		if(searchedList&&Object.keys(searchedList).length>0){
			for (const key in searchedList) {
				tableRows.push(this.getRow(searchedList[key],keyUnique));
				keyUnique++;
			}
			for (const key in searchedList[Object.keys(searchedList)[0]]) {
					tableHeader.push(getCell(staticData.getHeaderNameByKey(key),keyUnique+"header"));
					keyUnique++
			}
		}
    return (
      <div className="home-page">
			<TopBar 
      title={"English Premier League 2011/12"}
      onButtonClick={()=>{History.push("/chartpage")}}
      buttonLabel="Chart View"
			/>
					<div className="table">
						<div className="row header">
						{tableHeader}
						</div>
					   {tableRows}
					</div>
			</div>
    );
  }
}
const mapStateToProps = redux => ({
	searchedList:redux.searchedList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { searchedListAction:searchedListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;

function  getCell(data,index){
	return  <div key={index} className="cell">
					{data}
				</div>
}

